"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { allTrips } from "@/data";
import Earth from "./Earth";
import Atmosphere from "./Atmosphere";
import Clouds from "./Clouds";
import TripMarkers from "./TripMarkers";
import useIdleAutoRotate from "./useIdleAutoRotate";

const MIN_POLAR_ANGLE = Math.PI * 0.22;
const MAX_POLAR_ANGLE = Math.PI * 0.78;

// Responsive camera distance (§10): the globe stays visually ~70vh tall on
// desktop and pulls back progressively on narrower viewports.
function getCameraDistance(width) {
    if (width < 768) return 3.7;
    if (width < 1024) return 3.4;
    return 3.1;
}

function isCoarsePointer() {
    return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

function CameraRig() {
    const { size } = useThree();
    const lastWidth = useRef(-1);

    // Mutating the camera belongs in the render loop, not an effect — this
    // matches how every other transform in the scene is updated (see
    // TripMarker/useIdleAutoRotate) and only touches it when width changes.
    useFrame((state) => {
        if (lastWidth.current === size.width) return;
        lastWidth.current = size.width;
        state.camera.position.z = getCameraDistance(size.width);
        state.camera.updateProjectionMatrix();
    });

    return null;
}

function SceneContent({ reducedMotion, onSelectTrip, cardOpen }) {
    const controlsRef = useRef(null);
    useIdleAutoRotate(controlsRef, { reducedMotion, paused: cardOpen });
    // Desktop-only kill switch: cloud shell is skipped entirely on touch
    // devices and under reduced motion (one less draw call + texture fetch).
    const showClouds = useMemo(() => !isCoarsePointer(), []);

    return (
        <>
            <CameraRig />
            <Suspense fallback={null}>
                <Earth />
                <Atmosphere />
            </Suspense>
            {showClouds && !reducedMotion && (
                <Suspense fallback={null}>
                    <Clouds />
                </Suspense>
            )}
            <TripMarkers trips={allTrips} reducedMotion={reducedMotion} onSelect={onSelectTrip} />
            <Stars radius={80} depth={40} count={1500} factor={3} saturation={0} fade speed={reducedMotion ? 0 : 0.4} />
            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.06}
                rotateSpeed={0.45}
                minPolarAngle={MIN_POLAR_ANGLE}
                maxPolarAngle={MAX_POLAR_ANGLE}
                autoRotate={!reducedMotion}
                autoRotateSpeed={0}
            />
        </>
    );
}

/**
 * @param {{
 *   reducedMotion?: boolean,
 *   onSelectTrip?: (id: string) => void,
 *   onBackgroundClick?: () => void,
 *   cardOpen?: boolean,
 * }} props
 */
export default function GlobeScene({ reducedMotion = false, onSelectTrip, onBackgroundClick, cardOpen = false }) {
    const containerRef = useRef(null);
    const [frameloop, setFrameloop] = useState(/** @type {'always' | 'never'} */ ("always"));
    const [ready, setReady] = useState(false);
    const dpr = useMemo(() => (isCoarsePointer() ? [1, 1.5] : [1, 1.75]), []);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setFrameloop(entry.isIntersecting && entry.intersectionRatio > 0.05 ? "always" : "never");
            },
            { threshold: [0, 0.05, 1] }
        );
        observer.observe(node);

        const handleVisibility = () => {
            setFrameloop(document.hidden ? "never" : "always");
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className={`absolute inset-0 transition-transform duration-500 ease-out ${cardOpen ? "max-md:-translate-y-[6vh]" : ""}`}
            style={{ touchAction: "pan-y" }}
        >
            <motion.div
                className="w-full h-full"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                animate={ready ? (reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }) : {}}
                transition={reducedMotion ? { duration: 0.15 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
                <Canvas
                    frameloop={frameloop}
                    dpr={/** @type {[number, number]} */ (dpr)}
                    camera={{ fov: 42, position: [0, 0, 3.1] }}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    onPointerMissed={onBackgroundClick}
                    onCreated={() => setReady(true)}
                >
                    <SceneContent reducedMotion={reducedMotion} onSelectTrip={onSelectTrip} cardOpen={cardOpen} />
                </Canvas>
            </motion.div>
        </div>
    );
}
