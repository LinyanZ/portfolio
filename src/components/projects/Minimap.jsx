import { Circle, useScroll, Text } from "@react-three/drei";
import projects from "../../data/projects.json";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

console.log(projects);

function Minimap() {
  const { width, height } = useThree((state) => state.viewport);
  const ref = useRef();
  const scroll = useScroll();

  function scrollOffsetToIndex() {
    const numPages = projects.length + 4;
    const pageOffset = 1 / numPages;
    const projectsStartAt = pageOffset * 3;

    if (scroll.offset < projectsStartAt) return -1;
    return (scroll.offset - projectsStartAt) / pageOffset;
  }

  useFrame((state, delta) => {
    const currIndexFloat = scrollOffsetToIndex();

    ref.current.children.forEach((child, index) => {
      const isText = index >= projects.length;
      index = index % projects.length;

      const textOffset = isText ? -1.2 : 0;

      const x =
        currIndexFloat < 0 || currIndexFloat >= projects.length
          ? width / 2 + 0.5
          : width / 2 - 0.5 + textOffset;
      const y = -index * 0.3 + currIndexFloat * 0.3;
      child.position.x = THREE.MathUtils.damp(child.position.x, x, 8, delta);
      child.position.y = THREE.MathUtils.damp(child.position.y, y, 8, delta);

      const currIndex = Math.floor(currIndexFloat);
      const scale =
        currIndex === index ? (isText ? 0.03 : 0.04) : isText ? 0.015 : 0.01;
      child.scale.x = THREE.MathUtils.damp(child.scale.x, scale, 8, delta);
      child.scale.y = THREE.MathUtils.damp(child.scale.y, scale, 8, delta);
      child.scale.z = THREE.MathUtils.damp(child.scale.z, scale, 8, delta);
    });
  });

  return (
    <>
      <group ref={ref}>
        {projects.map((p, index) => (
          <Circle
            key={p.title}
            position={[width / 2 + 0.5, -index * 0.3, 0]}
            scale={[0.01, 0.01, 0.01]}
          ></Circle>
        ))}
        {projects.map((p, index) => (
          <Text
            position={[width / 2 + 0.5, 0, 0]}
            font={"/Raleway-ExtraLight.ttf"}
            fontSize={5}
            key={p.title}
            scale={[0.015, 0.015, 0.015]}
          >
            {p.title}
          </Text>
        ))}
      </group>
    </>
  );
}

export default Minimap;
