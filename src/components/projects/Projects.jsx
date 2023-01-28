import projects from "../../resources/projects.json";
import Lines from "./Lines";
import { Suspense, useRef, useState } from "react";
import gsap from "gsap";
import {
  useScroll,
  Text,
  Float,
  Mask,
  Image,
  Plane,
  useVideoTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function Projects() {
  const linePercentage = useRef({ value: 0 });
  const [canSwitch, setCanSwitch] = useState(true);
  const [index, setIndex] = useState(-1);
  const { width, height } = useThree((state) => state.viewport);

  const scroll = useScroll();

  const textRef = useRef();
  const [canToggleText, setCanToggleText] = useState(true);

  function toggleText(show = true, delay = 0, duration = 0.5) {
    if (canToggleText) {
      setCanToggleText(false);
      gsap.to(textRef.current, {
        fillOpacity: show ? 1 : 0,
        duration,
        delay,
        onComplete: () => {
          setCanToggleText(true);
        },
      });
    }
  }

  function scrollOffsetToIndex() {
    const numPages = projects.length + 3;
    const pageOffset = 1 / numPages;
    const projectsStartAt = pageOffset * 2;
    const projectsFinishAt = projectsStartAt + pageOffset * projects.length;

    if (scroll.offset < projectsStartAt) return -1;
    if (scroll.offset > projectsFinishAt) return projects.length - 1;
    return Math.floor((scroll.offset - projectsStartAt) / pageOffset);
  }

  useFrame(() => {
    console.log(scrollOffsetToIndex(), index);
    if (canSwitch && scrollOffsetToIndex() != index) {
      console.log("start transitioning");
      setCanSwitch(false);

      if (index < 0) {
        toggleText(true);
        gsap.to(linePercentage.current, {
          value: 1,
          duration: 1,
          onComplete: () => {
            setIndex(scrollOffsetToIndex());
            setCanSwitch(true);
          },
        });
      } else {
        toggleText(false);
        gsap.to(linePercentage.current, {
          value: -0.3,
          duration: 1,
          onComplete: () => {
            setIndex(scrollOffsetToIndex());
            if (scrollOffsetToIndex() >= 0) {
              toggleText(true);
              gsap.to(linePercentage.current, {
                value: 1,
                duration: 1,
                onComplete: () => {
                  setCanSwitch(true);
                },
              });
            } else {
              setCanSwitch(true);
            }
          },
        });
      }
    }
  });

  return (
    <>
      <Float>
        <group>
          <Mask id={1} scale={[1, 1, 1]} position={[0, -0.5, 0]}>
            <planeGeometry args={[1.08 * 2.4, 2.28 * 2.3]} />
          </Mask>
          {/* <Image url="/test.jpg" position={[0, 0, 0.3]} scale={[4.4, 2.2]} /> */}
          {/* <mesh position={[0, -0.5, 0.5]}>
              <planeGeometry args={[1.08 * 2, 2.28 * 2]} />
              <Suspense fallback={<meshBasicMaterial color="white" />}>
                <VideoMaterial url="/footprintTracker.mp4" toneMapped={false} />
              </Suspense>
            </mesh> */}
        </group>
      </Float>
      <Text
        position={[0, height / 2.8, 0]}
        font={"/Raleway-ExtraLight.ttf"}
        fontSize={0.3}
        ref={textRef}
        fillOpacity={0}
      >
        {projects[Math.max(index, 0)].title}
      </Text>
      <Lines mask={1} percentage={linePercentage.current} />
    </>
  );
}

export default Projects;
