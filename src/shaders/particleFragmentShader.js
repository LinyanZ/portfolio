export default /*html*/ `
	uniform float uTimeTwinkling;
	uniform float uBlur;
	uniform float uFade;
	uniform float uOpacity;

	uniform vec3 uColor1;
	uniform vec3 uColor2;

	varying float vDistance;
	varying vec3 vPosition;
	varying vec3 vRawPosition;

	void main() {
		vec2 cxy = 2.0 * gl_PointCoord - 1.0;
		float dist = dot(cxy, cxy);
		if (dist > 1.0) discard;

		float fade = clamp(vDistance * 0.01, 0.0, 1.0) * uFade;
		float blurAmount = pow((1.0 - dist), uBlur);

		float x = vRawPosition.x + uTimeTwinkling;
		float part1 = sin(4.0 * x / 6.0);
		float part2 = abs(sin(0.5 * x));
		float part3 = 0.2 * sin(13.0 * x / 14.0) + 0.6 * sin(5.0 * x / 14.0) + 0.2 * sin(17.0 * x / 14.0);
		float twinkling = 1.0 - abs(min(part1, min(part2, part3)));

		float colorAlpha = abs(sin(vRawPosition.x));
		gl_FragColor = vec4(mix(uColor1, uColor2, colorAlpha), (1.04 - fade) * blurAmount * twinkling * uOpacity);
	}
`;
