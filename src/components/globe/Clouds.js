"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { SRGBColorSpace, Vector3 } from "three";
import { getSunDirection } from "@/lib/solar";
import { cloudsVertexShader, cloudsFragmentShader } from "./shaders/cloudsShader";

const CLOUDS_SCALE = 1.006;
const SELF_ROTATION_PER_SECOND = (2 * Math.PI) / (5 * 60); // ~1 revolution / 5 min
const SUN_UPDATE_INTERVAL_MS = 60_000;

export default function Clouds() {
    const meshRef = useRef(null);
    const materialRef = useRef(null);
    const cloudsMap = useTexture("/textures/earth-clouds.jpg", (texture) => {
        texture.colorSpace = SRGBColorSpace;
    });

    const uniforms = useMemo(
        () => ({
            uCloudsMap: { value: cloudsMap },
            uSunDirection: { value: new Vector3(...getSunDirection(new Date())) },
        }),
        [cloudsMap]
    );

    useEffect(() => {
        const updateSunDirection = () => {
            const material = materialRef.current;
            if (!material) return;
            const [x, y, z] = getSunDirection(new Date());
            material.uniforms.uSunDirection.value.set(x, y, z);
        };
        updateSunDirection();
        const id = setInterval(updateSunDirection, SUN_UPDATE_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += SELF_ROTATION_PER_SECOND * delta;
        }
    });

    return (
        <mesh ref={meshRef} scale={CLOUDS_SCALE}>
            <sphereGeometry args={[1, 48, 48]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={cloudsVertexShader}
                fragmentShader={cloudsFragmentShader}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}
