"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { Color, SRGBColorSpace, Vector3 } from "three";
import { getSunDirection } from "@/lib/solar";
import { earthVertexShader, earthFragmentShader } from "./shaders/earthShader";

const SUN_UPDATE_INTERVAL_MS = 60_000;

export default function Earth() {
    const materialRef = useRef(null);
    const [dayMap, nightMap] = useTexture(
        ["/textures/earth-day.jpg", "/textures/earth-night.jpg"],
        ([day, night]) => {
            day.colorSpace = SRGBColorSpace;
            day.anisotropy = 4;
            night.colorSpace = SRGBColorSpace;
            night.anisotropy = 4;
        }
    );

    const uniforms = useMemo(
        () => ({
            uDayMap: { value: dayMap },
            uNightMap: { value: nightMap },
            uSunDirection: { value: new Vector3(...getSunDirection(new Date())) },
            uAtmosphereColor: { value: new Color(0.35, 0.55, 1.0) },
            uNightIntensity: { value: 1.6 },
        }),
        [dayMap, nightMap]
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

    return (
        <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={earthVertexShader}
                fragmentShader={earthFragmentShader}
            />
        </mesh>
    );
}
