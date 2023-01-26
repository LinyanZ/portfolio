import { useScroll, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Project({ index, title, count }) {
  const scroll = useScroll();
  const ref = useRef();
  const { width, height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      10 * (index + 1) - scroll.range(0, 1) * count * 10,
      20,
      delta
    );
  });

  return (
    <>
      <mesh ref={ref} position={[10 * (index + 1), 0, 0]}>
        <boxGeometry />
        <meshBasicMaterial color={"red"} />
        <Text
          position={[0, 2, 0]}
          font={"/Raleway-ExtraLight.ttf"}
          fontSize={0.3}
        >
          {title}
        </Text>
      </mesh>
    </>
  );
}

export default Project;
