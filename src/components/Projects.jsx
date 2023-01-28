import projects from "../data/projects.json";
import Lines from "./projects/Lines";
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
  Html,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "../contexts/themeContext";
import Minimap from "./projects/Minimap";

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

  const [theme] = useTheme();
  const nameStyle = `text-center leading-[12rem] text-[11rem] font-thin h-48 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

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
    const numPages = projects.length + 4;
    const pageOffset = 1 / numPages;
    const projectsStartAt = pageOffset * 3;

    if (scroll.offset < projectsStartAt) return -1;
    return Math.min(
      Math.floor((scroll.offset - projectsStartAt) / pageOffset),
      projects.length
    );
  }

  useFrame(() => {
    console.log(scrollOffsetToIndex(), index);
    if (canSwitch && scrollOffsetToIndex() != index) {
      setCanSwitch(false);

      if (index < 0 || index >= projects.length) {
        // start showing the first project right away
        setIndex(scrollOffsetToIndex());
        toggleText(true);
        gsap.to(linePercentage.current, {
          value: 1,
          duration: 1,
          onComplete: () => {
            setCanSwitch(true);
          },
        });
      } else {
        // hide the previous project
        toggleText(false);
        gsap.to(linePercentage.current, {
          value: -0.3,
          duration: 1,
          onComplete: () => {
            setIndex(scrollOffsetToIndex());

            if (
              scrollOffsetToIndex() >= 0 &&
              scrollOffsetToIndex() < projects.length
            ) {
              // show the next project
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
      <Html fullscreen>
        <div className="landing-section mt-[200vh]">
          <h1 className={nameStyle}>Projects</h1>
        </div>
      </Html>
      <Minimap />
      <Float>
        <group>
          <Mask id={1} scale={[1, 1, 1]} position={[0, 0, 0]}>
            {/* <planeGeometry args={[2.08 * 2.4, 2.28 * 2.3]} /> */}
            <planeGeometry args={[1.08 * 2.4, 2.28 * 2.25]} />
          </Mask>
          {/* <Image url="/test.jpg" position={[0, 0, 0.3]} scale={[4.4, 2.2]} /> */}
          <mesh position={[0, 0, 0.5]}>
            <planeGeometry args={[1.08 * 2, 2.28 * 2]} />
            <Suspense fallback={<meshBasicMaterial color="white" />}>
              <VideoMaterial url="/footprintTracker.mp4" toneMapped={false} />
            </Suspense>
          </mesh>
        </group>
      </Float>
      <Text
        position={[0, 3.2, 0]}
        font={"/Raleway-ExtraLight.ttf"}
        fontSize={0.3}
        ref={textRef}
        fillOpacity={0}
      >
        {projects[Math.max(Math.min(index, projects.length - 1), 0)].title}
      </Text>
      <Lines mask={1} percentage={linePercentage.current} />
    </>
  );
}

export default Projects;
