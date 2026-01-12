'use server'

import { cookies } from 'next/headers';
import { getTripData, saveTripData } from '@/lib/db';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default for dev if not set
const COOKIE_NAME = 'jpn_admin_session';

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value === 'true';
}

export async function loginAdmin(password) {
    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        // Set cookie for 30 days
        cookieStore.set(COOKIE_NAME, 'true', {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30
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

export async function fetchData(tripId, key) {
    return await getTripData(tripId, key);
}

export async function updateData(tripId, key, newData) {
    const isAuth = await checkAuth();
    if (!isAuth) {
        return { success: false, error: 'Non autorizzato' };
    }

    return await saveTripData(tripId, key, newData);
}
