import * as THREE from "three";
import { useMemo, useEffect, useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import "./shaders/dofPointsMaterial";
import gsap from "gsap";

const Particles = () => {
  const { focus, blur, fade, pointSize, sizeXY, sizeZ, offsetZ } = useControls(
    "Particles",
    {
      focus: { value: 50, min: 0, max: 100, step: 0.01 },
      blur: { value: 0.3, min: 0, max: 2, step: 0.0001 },
      fade: { value: 0.9, min: 0, max: 2, step: 0.0001 },
      pointSize: { value: 1, min: 0, max: 3, step: 0.0001 },
      sizeXY: { value: 250, min: 0, max: 1000, step: 0.01 },
      sizeZ: { value: 30, min: 30, max: 10000, step: 0.01 },
      offsetZ: { value: 50, min: 0, max: 800, step: 0.01 },
    }
  );

  const animation = { speed: 0.001 };

  useEffect(() => {
    gsap.to(animation, {
      duration: 1,
      speed: 0.6,
    });
    gsap.to(animation, {
      duration: 5,
      speed: 0.001,
      delay: 1,
      ease: "power4.out",
    });
  }, []);

  const renderRef = useRef();

  const particles = useMemo(() => {
    const count = 1000;
    const particles = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * sizeXY;
      const y = (Math.random() - 0.5) * sizeXY;
      const z = (Math.random() - 0.5) * sizeZ - offsetZ;

      let i3 = i * 3;
      particles[i3 + 0] = x;
      particles[i3 + 1] = y;
      particles[i3 + 2] = z;
    }
    return particles;
  }, [sizeXY, sizeZ]);

  useFrame((state, delta) => {
    renderRef.current.uniforms.uTimeMovement.value += delta * animation.speed;
    renderRef.current.uniforms.uTimeTwinkling.value = state.clock.elapsedTime;
    renderRef.current.uniforms.uSizeXY.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uSizeXY.value,
      sizeXY,
      0.05
    );
    renderRef.current.uniforms.uSizeZ.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uSizeZ.value,
      sizeZ,
      0.05
    );
    renderRef.current.uniforms.uOffsetZ.value = THREE.MathUtils.lerp(
      renderRef.current.uniforms.uOffsetZ.value,
      offsetZ,
      0.05
    );
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
