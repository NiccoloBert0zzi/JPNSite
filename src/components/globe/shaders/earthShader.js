/**
 * Real-time day/night Earth shader.
 *
 * Blends the day (Blue Marble) and night (Black Marble) textures based on
 * the angle between the surface normal and the real sun direction, with a
 * soft twilight terminator band and a warm sunset tint. See docs/globe-landing-plan.md §4.1.
 */

export const earthVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    vUv = uv;

    vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
    vNormal = worldNormal;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

export const earthFragmentShader = `
uniform sampler2D uDayMap;
uniform sampler2D uNightMap;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereColor;
uniform float uNightIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);
    vec3 sunDir = normalize(uSunDirection);

    float cosSun = dot(normal, sunDir);

    // Soft ~14 degree twilight band (smoothstep half-width 0.12 ~= 6.9 degrees each side).
    float dayMix = smoothstep(-0.12, 0.12, cosSun);

    vec3 day = texture2D(uDayMap, vUv).rgb;

    // City lights fade out before the terminator reaches full day, not at noon.
    float nightGate = 1.0 - smoothstep(-0.18, 0.0, cosSun);
    vec3 night = texture2D(uNightMap, vUv).rgb * uNightIntensity * nightGate;

    vec3 color = mix(night, day, dayMix);

    // Warm sunset/sunrise tint centered exactly on the terminator.
    float twilight = 1.0 - abs(clamp(cosSun / 0.12, -1.0, 1.0));
    color += vec3(0.9, 0.35, 0.15) * twilight * 0.25;

    // Subtle in-material limb glow, stronger on the lit side.
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    color += uAtmosphereColor * fresnel * 0.35 * (0.15 + 0.85 * dayMix);

    gl_FragColor = vec4(color, 1.0);
}
`;
