"use client";

import { useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Ambient drift, independent of the hero globe's own drag/idle rotation —
// this backdrop is decorative only, never interactive. Roughly matches the
// hero globe's idle auto-rotate pace so the two read as one continuous scene.
const ROTATE_SPEED = 0.04;

function RotatingStars({ reducedMotion }) {
    const groupRef = useRef(/** @type {any} */ (null));
    useFrame((_, delta) => {
        if (reducedMotion || !groupRef.current) return;
        groupRef.current.rotation.y += delta * ROTATE_SPEED;
    });
    return (
        <group ref={groupRef}>
            <Stars radius={80} depth={40} count={1200} factor={3} saturation={0} fade speed={0} />
        </group>
    );
}

function detectWebGLSupport() {
    try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
        return false;
    }
}

function subscribe() {
    // Support/motion-preference are read once; nothing external needs to
    // re-trigger this check, so there's nothing to subscribe to.
    return () => {};
}

// Cached so useSyncExternalStore gets a referentially stable snapshot —
// support/motion-preference don't change mid-session anyway.
let cachedSnapshot = /** @type {{ supported: boolean, reducedMotion: boolean } | null} */ (null);

function getSnapshot() {
    if (!cachedSnapshot) {
        cachedSnapshot = {
            supported: detectWebGLSupport(),
            reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        };
    }
    return cachedSnapshot;
}

function getServerSnapshot() {
    return null;
}

/**
 * Decorative full-page starfield behind every hub page: fixed, non-interactive
 * (pointer-events-none), so the rotating space background continues past the
 * globe hero's own boundary — behind the feature cards and the closing quote
 * too, instead of stopping dead at the hero.
 */
export default function SpaceBackdrop() {
    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (!state?.supported) return null;

    return (
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
            <Canvas
                frameloop={state.reducedMotion ? "never" : "always"}
                dpr={[1, 1.5]}
                camera={{ fov: 50, position: [0, 0, 1] }}
                gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
                onCreated={({ gl }) => gl.setClearColor("#03050c", 1)}
            >
                <RotatingStars reducedMotion={state.reducedMotion} />
            </Canvas>
        </div>
    );
}
