import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import "../../shaders/dofPointsMaterial";
import { useTheme } from "../../contexts/themeContext";
import { useControls } from "leva";
import { lerp, useMousePos } from "../../utils";
import { useProject } from "../../contexts/projectContext";
import { useEffect } from "react";

const Particles = ({ count = 1000, animation }) => {
  const [theme] = useTheme();
  const [selectedProject] = useProject();
  const renderRef = useRef();
  const mousePos = useMousePos();
  const [zOffset, setZOffset] = useState(0);

  useEffect(() => {
    if (selectedProject) setZOffset(30);
    else setZOffset(0);
  }, [selectedProject]);

  const color1 =
    theme === "dark"
      ? new THREE.Vector3(1.0, 240.0 / 255.0, 218.0 / 255.0)
      : new THREE.Vector3(0, 0, 0);
  const color2 =
    theme === "dark"
      ? new THREE.Vector3(1.0, 215.0 / 255.0, 170.0 / 255.0)
      : new THREE.Vector3(0, 0, 0);

  const particles = useMemo(() => {
    const particles = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * animation.sizeXY;
      const y = (Math.random() - 0.5) * animation.sizeXY;
      const z = (Math.random() - 0.5) * animation.sizeZ - animation.offsetZ;

      let i3 = i * 3;
      particles[i3 + 0] = x;
      particles[i3 + 1] = y;
      particles[i3 + 2] = z;
    }
    return particles;
  }, [animation.sizeXY, animation.sizeZ]);

  useFrame((state, delta) => {
    const lerpFactor = 7 * delta;

    renderRef.current.uniforms.uTimeMovement.value += delta * animation.speed;
    renderRef.current.uniforms.uTimeTwinkling.value = state.clock.elapsedTime;
    renderRef.current.uniforms.uSizeXY.value = lerp(
      renderRef.current.uniforms.uSizeXY.value,
      animation.sizeXY,
      lerpFactor
    );
    renderRef.current.uniforms.uSizeZ.value = lerp(
      renderRef.current.uniforms.uSizeZ.value,
      animation.sizeZ + zOffset,
      lerpFactor
    );
    renderRef.current.uniforms.uOffsetZ.value = lerp(
      renderRef.current.uniforms.uOffsetZ.value,
      animation.offsetZ,
      lerpFactor
    );
    renderRef.current.uniforms.uFocus.value = lerp(
      renderRef.current.uniforms.uFocus.value,
      animation.focus,
      lerpFactor
    );
    renderRef.current.uniforms.uBlur.value = lerp(
      renderRef.current.uniforms.uBlur.value,
      animation.blur,
      lerpFactor
    );
    renderRef.current.uniforms.uFade.value = lerp(
      renderRef.current.uniforms.uFade.value,
      animation.fade,
      lerpFactor
    );
    renderRef.current.uniforms.uPointSize.value = lerp(
      renderRef.current.uniforms.uPointSize.value,
      animation.pointSize,
      lerpFactor
    );
    renderRef.current.uniforms.uOpacity.value = lerp(
      renderRef.current.uniforms.uOpacity.value,
      animation.opacity,
      lerpFactor
    );
    renderRef.current.uniforms.uMouseX.value = lerp(
      renderRef.current.uniforms.uMouseX.value,
      mousePos.x,
      lerpFactor * 0.5
    );
    renderRef.current.uniforms.uMouseY.value = lerp(
      renderRef.current.uniforms.uMouseY.value,
      mousePos.y,
      lerpFactor * 0.5
    );

    const lookAt = new THREE.Vector3();
    state.camera.getWorldDirection(lookAt);
    const cameraPos = state.camera.position.clone();
    renderRef.current.uniforms.uCameraPos.value = cameraPos;
    renderRef.current.uniforms.uCameraLookAt.value = lookAt;

    renderRef.current.uniforms.uColor1.value.lerp(color1, lerpFactor);
    renderRef.current.uniforms.uColor2.value.lerp(color2, lerpFactor);
  });

  return (
    <points>
      <dofPointsMaterial ref={renderRef} />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
};

export default Particles;

// import { useControls } from "leva";

// const { focus, blur, fade, pointSize, sizeXY, sizeZ, offsetZ } = useControls(
//   "Burst",
//   {
//     focus: { value: 50, min: 0, max: 100, step: 0.01 },
//     blur: { value: 0.3, min: 0, max: 2, step: 0.0001 },
//     fade: { value: 0.9, min: 0, max: 2, step: 0.0001 },
//     pointSize: { value: 1, min: 0, max: 3, step: 0.0001 },
//     sizeXY: { value: 250, min: 0, max: 1000, step: 0.01 },
//     sizeZ: { value: 30, min: 30, max: 10000, step: 0.01 },
//     offsetZ: { value: 50, min: 0, max: 800, step: 0.01 },
//     opacity: { value: 1, min: 0, max: 1, step: 0.001 },
//   }
// );
