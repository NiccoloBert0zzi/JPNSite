"use client";

import { useMemo } from "react";
import { AdditiveBlending, BackSide, Color } from "three";
import { atmosphereVertexShader, atmosphereFragmentShader } from "./shaders/atmosphereShader";

const ATMOSPHERE_SCALE = 1.05;

export default function Atmosphere() {
    const uniforms = useMemo(
        () => ({
            uAtmosphereColor: { value: new Color(0.4, 0.65, 1.0) },
        }),
        []
    );

    return (
        <mesh scale={ATMOSPHERE_SCALE}>
            <sphereGeometry args={[1, 48, 48]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={atmosphereVertexShader}
                fragmentShader={atmosphereFragmentShader}
                side={BackSide}
                blending={AdditiveBlending}
                depthWrite={false}
                transparent
            />
        </mesh>
    );
}
