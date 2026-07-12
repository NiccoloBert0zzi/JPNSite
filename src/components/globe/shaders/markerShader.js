/**
 * Shared billboard-quad shaders for trip markers: an expanding pulse ring and
 * a soft procedural glow, both additive-blended, no textures involved.
 * See docs/globe-landing-plan.md §4.5.
 */

export const markerBillboardVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const pulseRingFragmentShader = `
uniform float uTime;
uniform vec3 uColor;
uniform float uPaused;

varying vec2 vUv;

const float PERIOD = 2.4;
const float RING_WIDTH = 0.12;

void main() {
    float dist = length(vUv - 0.5) * 2.0;
    float t = uPaused > 0.5 ? 0.0 : fract(uTime / PERIOD);

    float radius = mix(0.2, 1.0, t);
    float ring = smoothstep(radius - RING_WIDTH, radius, dist) * (1.0 - smoothstep(radius, radius + RING_WIDTH, dist));

    float alpha = 0.7 * pow(1.0 - t, 2.0);

    gl_FragColor = vec4(uColor, ring * alpha);
}
`;

export const glowFragmentShader = `
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main() {
    float dist = length(vUv - 0.5) * 2.0;
    float falloff = smoothstep(1.0, 0.0, dist);
    gl_FragColor = vec4(uColor, falloff * uOpacity);
}
`;
