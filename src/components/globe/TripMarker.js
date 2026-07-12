"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import { AdditiveBlending, Color, MathUtils, Vector3 } from "three";
import { latLngToVector3 } from "@/lib/geo";
import { markerBillboardVertexShader, pulseRingFragmentShader, glowFragmentShader } from "./shaders/markerShader";

const MARKER_RADIUS = 1.012;
const HOVER_DAMP_LAMBDA = 8;
const IDLE_GLOW_OPACITY = 0.35;
const HOVER_GLOW_OPACITY = 0.7;

// Reused across all marker instances inside the single-threaded render loop —
// never allocate a fresh Vector3 per marker per frame.
const scratchCameraDir = new Vector3();

/**
 * @param {{
 *   trip: any,
 *   reducedMotion?: boolean,
 *   onSelect?: (id: string) => void,
 * }} props
 */
export default function TripMarker({ trip, reducedMotion = false, onSelect }) {
    const groupRef = useRef(null);
    const dotRef = useRef(null);
    const ringMaterialRef = useRef(null);
    const glowMaterialRef = useRef(null);
    const hoverRef = useRef(0);

    const position = useMemo(
        () => latLngToVector3(trip.marker.lat, trip.marker.lng, MARKER_RADIUS),
        [trip.marker.lat, trip.marker.lng]
    );
    const normal = useMemo(() => new Vector3(...position).normalize(), [position]);
    const color = useMemo(() => new Color(trip.theme.primary), [trip.theme.primary]);

    const ringUniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: color },
            uPaused: { value: reducedMotion ? 1 : 0 },
        }),
        [color, reducedMotion]
    );

    const glowUniforms = useMemo(
        () => ({
            uColor: { value: color },
            uOpacity: { value: IDLE_GLOW_OPACITY },
        }),
        [color]
    );

    useFrame((state, delta) => {
        // Far-side fade: markers melt away as they rotate behind the limb.
        scratchCameraDir.copy(state.camera.position).normalize();
        const visibleFactor = MathUtils.smoothstep(normal.dot(scratchCameraDir), 0.0, 0.25);
        if (groupRef.current) {
            groupRef.current.scale.setScalar(0.6 + 0.4 * visibleFactor);
            groupRef.current.visible = visibleFactor > 0.02;
        }

        if (ringMaterialRef.current && !reducedMotion) {
            ringMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }

        const hoverTarget = hoverRef.current;
        if (glowMaterialRef.current) {
            const current = glowMaterialRef.current.uniforms.uOpacity.value;
            const target = IDLE_GLOW_OPACITY + hoverTarget * (HOVER_GLOW_OPACITY - IDLE_GLOW_OPACITY);
            glowMaterialRef.current.uniforms.uOpacity.value = MathUtils.damp(current, target, HOVER_DAMP_LAMBDA, delta);
        }
        if (dotRef.current) {
            const currentScale = dotRef.current.scale.x;
            const nextScale = MathUtils.damp(currentScale, 1 + hoverTarget * 0.3, HOVER_DAMP_LAMBDA, delta);
            dotRef.current.scale.setScalar(nextScale);
        }
    });

    const handlePointerOver = (event) => {
        event.stopPropagation();
        hoverRef.current = 1;
        document.body.style.cursor = "pointer";
    };
    const handlePointerOut = (event) => {
        event.stopPropagation();
        hoverRef.current = 0;
        document.body.style.cursor = "auto";
    };
    const handleClick = (event) => {
        event.stopPropagation();
        onSelect?.(trip.id);
    };

    return (
        <group ref={groupRef} position={position}>
            <Billboard>
                <mesh renderOrder={0}>
                    <planeGeometry args={[0.12, 0.12]} />
                    <shaderMaterial
                        ref={glowMaterialRef}
                        uniforms={glowUniforms}
                        vertexShader={markerBillboardVertexShader}
                        fragmentShader={glowFragmentShader}
                        transparent
                        depthWrite={false}
                        blending={AdditiveBlending}
                    />
                </mesh>

                <mesh renderOrder={1}>
                    <planeGeometry args={[0.09, 0.09]} />
                    <shaderMaterial
                        ref={ringMaterialRef}
                        uniforms={ringUniforms}
                        vertexShader={markerBillboardVertexShader}
                        fragmentShader={pulseRingFragmentShader}
                        transparent
                        depthWrite={false}
                        blending={AdditiveBlending}
                    />
                </mesh>

                <mesh ref={dotRef} renderOrder={2}>
                    <circleGeometry args={[0.016, 24]} />
                    <meshBasicMaterial color={color} toneMapped={false} />
                </mesh>

                {/* Invisible 3x touch halo carrying the pointer/click handlers */}
                <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshBasicMaterial colorWrite={false} depthWrite={false} transparent opacity={0} />
                </mesh>
            </Billboard>
        </group>
    );
}
