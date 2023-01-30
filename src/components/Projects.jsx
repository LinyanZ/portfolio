import { Suspense, useRef, useState } from "react";
import gsap from "gsap";
import {
  useScroll,
  Text,
  Float,
  Image,
  useVideoTexture,
  Html,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "../contexts/themeContext";
import Minimap from "./projects/Minimap";
import Phone from "./projects/Phone";
import GamingPC from "./projects/GamingPC";
import Lines from "./projects/Lines";
import projects from "../data/projects.json";
import Laptop from "./projects/Laptop";
import City from "./projects/City";
import Monitor from "./projects/Monitor";
import Plane from "./projects/Plane";
import Board from "./projects/Board";
import User from "./projects/User";

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
      <Float floatIntensity={0.15} speed={1} rotationIntensity={0.15}>
        {index === 0 && <Laptop />}
        {index === 1 && <GamingPC />}
        {index === 2 && <Board />}
        {index === 3 && (
          <>
            <City />
            <Monitor />
          </>
        )}
        {index === 4 && (
          <>
            <Plane
              rotation={[Math.PI / 2, -2.1, 0]}
              start={[10, -4, -5]}
              end={{ x: -5, y: 2 }}
            />
            <Plane
              rotation={[Math.PI / 2, 1.9, 0]}
              start={[-5, -3, -5]}
              end={{ x: 5, y: -1 }}
            />
            <Phone />
          </>
        )}
        {index === 5 && <User />}
        {/* <mesh position={[0, 0, 0.35]}>
          <planeGeometry args={[1.08 * 2, 2.28 * 2]} />
          <Suspense fallback={<meshBasicMaterial color="white" />}>
            <VideoMaterial url="/footprintTracker.mp4" toneMapped={false} />
          </Suspense>
        </mesh> */}
      </Float>
      <Text
        position={[0, 3, 0]}
        font={"/Raleway-ExtraLight.ttf"}
        fontSize={0.3}
        ref={textRef}
        fillOpacity={0}
      >
        {projects[Math.max(Math.min(index, projects.length - 1), 0)].title}
      </Text>
      <Lines index={index} mask={1} percentage={linePercentage.current} />
    </>
  );
}

export default Projects;
