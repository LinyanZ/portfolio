export default /*html*/ `
	uniform float uTimeTwinkling;
	uniform float uBlur;
	uniform float uFade;

	varying float vDistance;
	varying vec3 vPosition;
	varying vec3 vRawPosition;

	float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
	}

	void main() {
		vec2 cxy = 2.0 * gl_PointCoord - 1.0;
		float dist = dot(cxy, cxy);
		if (dist > 1.0) discard;

		float fade = clamp(vDistance * 0.01, 0.0, 1.0) * uFade;
		float blurAmount = pow((1.0 - dist), uBlur);

		float twinkling = (sin(uTimeTwinkling + vRawPosition.x) + 1.0) * 0.5;

		gl_FragColor = vec4(vec3(1.0), (1.04 - fade) * blurAmount * twinkling);
	}
`;
