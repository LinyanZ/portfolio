import * as THREE from "three";
import { useMemo, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import "./shaders/dofPointsMaterial";

const Particles = ({
  speed,
  blur,
  focus,
  pointSize,
  fade,
  sizeXY = 250,
  sizeZ = 30,
  ...props
}) => {
  const renderRef = useRef();

  const particles = useMemo(() => {
    const count = 1000;
    const particles = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * sizeXY;
      const y = (Math.random() - 0.5) * sizeXY;
      const z = (Math.random() - 0.5) * sizeZ - 50;

      let i3 = i * 3;
      particles[i3 + 0] = x;
      particles[i3 + 1] = y;
      particles[i3 + 2] = z;
    }
    return particles;
  }, [sizeXY, sizeZ]);

  useFrame((state) => {
    renderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    renderRef.current.uniforms.uSpeed.value = speed;
    renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uFocus.value,
      focus,
      0.05
    );
    renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uBlur.value,
      blur,
      0.05
    );
    renderRef.current.uniforms.uFade.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uFade.value,
      fade,
      0.05
    );
    renderRef.current.uniforms.uPointSize.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uPointSize.value,
      pointSize,
      0.05
    );

    const lookAt = new THREE.Vector3();
    state.camera.getWorldDirection(lookAt);
    const cameraPos = state.camera.position.clone();
    renderRef.current.uniforms.uCameraPos.value = cameraPos;
    renderRef.current.uniforms.uCameraLookAt.value = lookAt;
  });

  return (
    <points {...props}>
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
