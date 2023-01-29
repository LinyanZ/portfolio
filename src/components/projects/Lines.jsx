import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useMask } from "@react-three/drei";
import projects from "../../data/projects.json";
import { useTheme } from "../../contexts/themeContext";

function Lines({ index, mask, percentage }) {
  const ref = useRef();
  const { height } = useThree((state) => state.viewport);
  const [theme] = useTheme();

  const stencil = useMask(mask);

  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 1, 0),
  ]);

  const lines = [
    ...Array(
      index >= 0 && index < projects.length ? projects[index].numLines : 0
    ).keys(),
  ];

  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      const portion = (Math.abs(index - lines.length / 2) / lines.length) * 2;
      const y = percentage.value > portion ? height : 0;
      child.scale.y = THREE.MathUtils.damp(child.scale.y, y, 8, delta);
    });
  });

  return (
    <group ref={ref}>
      {lines.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          position={[i * 0.06 - lines.length * 0.03, -height / 2, 0]}
          scale={[1, 0, 1]}
        >
          <lineBasicMaterial
            color={theme === "dark" ? "white" : "black"}
            {...stencil}
          />
        </line>
      ))}
    </group>
  );
}

export default Lines;
