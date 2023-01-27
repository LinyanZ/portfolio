import projects from "../../resources/projects.json";
import Lines from "./Lines";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useScroll, Text, Float, Mask, Image, Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const threshold = 0.1;

function Projects() {
  const linePercentage = useRef({ value: 1 });
  const [canSwitch, setCanSwitch] = useState(true);
  const [index, setIndex] = useState(0);
  const { width, height } = useThree((state) => state.viewport);

  const scroll = useScroll();

  useFrame(() => {
    if (
      canSwitch &&
      Math.floor(Math.min(scroll.offset, 0.99) * projects.length) != index
    ) {
      setCanSwitch(false);

      gsap.to(linePercentage.current, {
        value: -1,
        duration: 1,
        onComplete: () => {
          setIndex(Math.floor(Math.min(scroll.offset, 0.99) * projects.length));
        },
      });
      gsap.to(linePercentage.current, {
        value: 1,
        duration: 1,
        delay: 1,
        onComplete: () => {
          setCanSwitch(true);
        },
      });
    }
  });

  return (
    <>
      <Float>
        <group>
          <Mask id={1} scale={[1, 1, 1]}>
            <planeGeometry args={[5, 2.5]} />
          </Mask>
          <Image url="/test.jpg" position={[0, 0, 0.3]} scale={[4.4, 2.2]} />
        </group>
      </Float>
      <Text
        position={[0, height / 2.8, 0]}
        font={"/Raleway-ExtraLight.ttf"}
        fontSize={0.3}
      >
        {projects[index].title}
      </Text>
      <Lines mask={1} percentage={linePercentage.current} />
    </>
  );
}

export default Projects;
