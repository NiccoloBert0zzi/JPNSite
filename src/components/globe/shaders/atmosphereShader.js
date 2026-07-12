/**
 * Atmosphere rim-glow shader. Rendered on an oversized BackSide shell around
 * the Earth: the depth test against the opaque Earth sphere hides everything
 * except the thin silhouette ring at the limb, which this shader lights up.
 * This additive glow stands in for real bloom (see docs/globe-landing-plan.md §4.2).
 */

export const atmosphereVertexShader = `
varying vec3 vNormal;

void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const atmosphereFragmentShader = `
uniform vec3 uAtmosphereColor;

varying vec3 vNormal;

void main() {
    float intensity = pow(max(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.5);
    gl_FragColor = vec4(uAtmosphereColor, 1.0) * intensity;
}
`;
