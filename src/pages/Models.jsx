import { useRef, useState, useEffect } from "react";
import { useScroll, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

import Minimap from "../components/projects/Minimap";
import Lines from "../components/projects/Lines";
import Laptop from "../components/projects/Laptop";
import GamingPC from "../components/projects/GamingPC";
import Board from "../components/projects/Board";
import DataVisualiser from "../components/projects/DataVisualiser";
import FootprintTracker from "../components/projects/FootprintTracker";
import User from "../components/projects/User";

import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";
import projects from "../data/projects.json";

const modelAnimationDuration = 1;
const videoAnimationDuration = 0.5;

function Models() {
  const linePercentage = useRef({ value: 1 });
  const opacityRef = useRef({ value: 0 });
  const [canSwitch, setCanSwitch] = useState(true);
  const [project, setProject] = useProject();
  const { width, height } = useThree((state) => state.viewport);

  const scroll = useScroll();
  const [theme] = useTheme();

  function scrollOffsetToIndex() {
    const pageOffset = 1 / projects.length;

    if (scroll.offset < 0) return 0;
    return Math.min(
      Math.floor(scroll.offset / pageOffset),
      projects.length - 1
    );
  }

  function showNextProject(nextProject) {
    gsap.to(linePercentage.current, {
      value: 1,
      duration: modelAnimationDuration,
      onComplete: () => {
        if (projects[nextProject].hasVideo) {
          gsap.to(opacityRef.current, {
            value: 1,
            duration: videoAnimationDuration,
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

  function switchToNextProject() {
    gsap.to(linePercentage.current, {
      value: -0.3,
      duration: modelAnimationDuration,
      onComplete: () => {
        const nextProject = scrollOffsetToIndex();
        setProject(nextProject);
        if (nextProject >= 0 && nextProject < projects.length) {
          showNextProject(nextProject);
        } else {
          setCanSwitch(true);
        }
      },
    });
  }

  function hideVideoIfExistThen(onComplete) {
    if (projects[project].hasVideo) {
      gsap.to(opacityRef.current, {
        value: 0,
        duration: videoAnimationDuration,
        onComplete,
      });
    } else {
      onComplete();
    }
  }

  useFrame(() => {
    if (canSwitch && scrollOffsetToIndex() != project) {
      setCanSwitch(false);
      if (project < 0 || project >= projects.length) {
        const nextProject = scrollOffsetToIndex();
        setProject(nextProject);
        showNextProject(nextProject);
      } else {
        hideVideoIfExistThen(switchToNextProject);
      }
    }
  });

  useEffect(() => {
    return () => {
      setProject(-1);
    };
  }, []);

  return (
    <>
      <Minimap />
      <Float floatIntensity={0.15} speed={1} rotationIntensity={0.15}>
        {project === 0 && <Laptop opacityRef={opacityRef.current} />}
        {project === 1 && <GamingPC opacityRef={opacityRef.current} />}
        {project === 2 && <Board />}
        {project === 3 && <DataVisualiser opacityRef={opacityRef} />}
        {project === 4 && <FootprintTracker opacityRef={opacityRef} />}
        {project === 5 && <User />}
      </Float>
      <Lines index={project} mask={1} percentage={linePercentage.current} />
    </>
  );
}

export default Models;
