export default /*html*/ `
	uniform float uTime;
	uniform float uBlur;
	uniform float uFade;

	varying float vDistance;
	varying vec3 vPosition;

	void main() {
		vec2 cxy = 2.0 * gl_PointCoord - 1.0;
		float dist = dot(cxy, cxy);
		if (dist > 1.0) discard;

		float fade = clamp(vDistance * 0.01, 0.0, 1.0) * uFade;
		float blurAmount = pow((1.0 - dist), uBlur);

		float twinkling = (sin(uTime + vPosition.x) + 1.0) * 0.5;

		gl_FragColor = vec4(vec3(1.0), (1.04 - fade) * blurAmount * twinkling);
	}
`;
