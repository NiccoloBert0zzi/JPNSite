/**
 * Optional cloud shell (Phase 7, desktop-only): a thin sphere just above the
 * Earth's surface, its alpha driven by a grayscale cloud map and its
 * brightness dimmed on the night side using the same sun direction as Earth.
 */

export const cloudsVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

export const cloudsFragmentShader = `
uniform sampler2D uCloudsMap;
uniform vec3 uSunDirection;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);
    float cosSun = dot(normal, normalize(uSunDirection));
    float brightness = clamp(cosSun * 0.5 + 0.5, 0.15, 1.0);

    float cloudAlpha = texture2D(uCloudsMap, vUv).r;

    gl_FragColor = vec4(vec3(brightness), cloudAlpha * 0.8);
}
`;
