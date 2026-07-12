"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const IDLE_TIMEOUT_MS = 4000;
const RESUME_SPEED = 0.4;
const DAMP_LAMBDA = 1.2;

/**
 * Drives OrbitControls.autoRotateSpeed: pauses the moment the user grabs the
 * globe, then fades rotation back in (never snaps) after IDLE_TIMEOUT_MS of
 * no interaction. `paused` lets a parent (e.g. an open trip card) hold it at 0.
 * @param {import('react').RefObject<any>} controlsRef
 * @param {{ reducedMotion?: boolean, paused?: boolean }} [options]
 */
export default function useIdleAutoRotate(controlsRef, { reducedMotion = false, paused = false } = {}) {
    const speedTarget = useRef(reducedMotion ? 0 : RESUME_SPEED);
    const timeoutRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls || reducedMotion) return undefined;

        const handleStart = () => {
            speedTarget.current = 0;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        const handleEnd = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                speedTarget.current = RESUME_SPEED;
            }, IDLE_TIMEOUT_MS);
        };

        controls.addEventListener("start", handleStart);
        controls.addEventListener("end", handleEnd);

        return () => {
            controls.removeEventListener("start", handleStart);
            controls.removeEventListener("end", handleEnd);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [controlsRef, reducedMotion]);

    useFrame((_, delta) => {
        const controls = controlsRef.current;
        if (!controls) return;
        const target = reducedMotion || paused ? 0 : speedTarget.current;
        controls.autoRotateSpeed = MathUtils.damp(controls.autoRotateSpeed || 0, target, DAMP_LAMBDA, delta);
    });
}
