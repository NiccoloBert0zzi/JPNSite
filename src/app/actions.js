'use server'

import crypto from 'crypto';
import { cookies, headers } from 'next/headers';
import { getTripData, saveTripData } from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (
    process.env.NODE_ENV === 'production'
        ? null // guarded per-call below
        : 'admin123'
);
const COOKIE_NAME = 'jpn_admin_session';

const VALID_TRIP_IDS = ['japan', 'budapest'];
const VALID_KEYS = ['itinerary', 'accommodations', 'transport', 'budget'];

// Per-instance rate limiter (best-effort on serverless — limits bursts within one instance)
/** @type {Map<string, { count: number, resetAt: number }>} */
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

/** @param {string} ip */
function isRateLimited(ip) {
    const now = Date.now();
    const entry = loginAttempts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };
    if (now > entry.resetAt) {
        entry.count = 0;
        entry.resetAt = now + WINDOW_MS;
    }
    entry.count++;
    loginAttempts.set(ip, entry);
    return entry.count > MAX_ATTEMPTS;
}

/** @param {string} password */
function getExpectedToken(password) {
    return crypto
        .createHmac('sha256', password)
        .update('jpn_session_v1')
        .digest('hex');
}

export async function checkAuth() {
    if (!ADMIN_PASSWORD) return false;
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return !!token && token === getExpectedToken(ADMIN_PASSWORD);
}

/** @param {string} password */
export async function loginAdmin(password) {
    if (!ADMIN_PASSWORD) {
        return { success: false, error: 'Server non configurato correttamente' };
    }

    const headerStore = await headers();
    const ip = headerStore.get('x-forwarded-for') ?? headerStore.get('x-real-ip') ?? 'unknown';
    if (isRateLimited(ip)) {
        return { success: false, error: 'Troppi tentativi. Riprova tra 15 minuti.' };
    }

    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, getExpectedToken(password), {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
        });
        return { success: true };
    }
    return { success: false, error: 'Password errata' };
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return { success: true };
}

/**
 * @param {string} tripId
 * @param {string} key
 */
export async function fetchData(tripId, key) {
    return await getTripData(tripId, key);
}

/**
 * @param {string} tripId
 * @param {string} key
 * @param {unknown} newData
 */
export async function updateData(tripId, key, newData) {
    const isAuth = await checkAuth();
    if (!isAuth) {
        return { success: false, error: 'Non autorizzato' };
    }

    if (!VALID_TRIP_IDS.includes(tripId) || !VALID_KEYS.includes(key)) {
        return { success: false, error: 'Parametri non validi' };
    }

    return await saveTripData(tripId, key, newData);
}
