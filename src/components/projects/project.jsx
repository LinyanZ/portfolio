import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import AnimatedMedia from "./animatedMedia";
import ProjectDetail from "./projectDetails";

import { useTheme } from "../../contexts/themeContext";
import { useProject } from "../../contexts/projectContext";
import { useWindowSize, useObjectSize } from "../../utils";

export default function Project({
  p,
  i,
  total,
  startOffset = 0.8,
  endOffset = 2.3,
}) {
  const [theme] = useTheme();

  const ref = useRef(null);
  const [mediaWidth, mediaHeight] = useObjectSize(ref);
  const [windowWidth, windowHeight] = useWindowSize();
  const margin = (windowWidth - mediaWidth) / 2 - 20;

  const [selectedProject, setSelectedProject] = useProject();

  const { scrollYProgress } = useScroll();
  const ySpring = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.00001,
  });

  const mediaX = useTransform(
    ySpring,
    [
      0,
      (i + startOffset - 0.3) / (total + endOffset),
      (i + startOffset + 1.3) / (total + endOffset),
      1,
    ],
    [
      windowWidth - margin,
      windowWidth - margin,
      -windowWidth + margin,
      -windowWidth + margin,
    ]
  );

  const textX = useTransform(
    ySpring,
    [
      0,
      (i + startOffset - 0.3) / (total + endOffset),
      (i + startOffset + 1.3) / (total + endOffset),
      1,
    ],
    [
      0.3 * windowWidth,
      0.3 * windowWidth,
      -0.3 * windowWidth,
      -0.3 * windowWidth,
    ]
  );

  return (
    <>
      <motion.div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center pointer-events-none">
        <motion.div
          className="w-fit mx-auto pointer-events-auto"
          ref={ref}
          style={{ x: mediaX }}
        >
          <AnimatedMedia p={p} handleClick={() => setSelectedProject(p)} />
          <motion.h2
            className={`project-title text--${theme} font-medium absolute top-[-5vh] left-0 w-full text-center drop-shadow-2xl`}
            style={{
              x: textX,
              y: mediaHeight * 1.03,
            }}
          >
            {p.title}
          </motion.h2>
        </motion.div>
      </motion.div>
      <ProjectDetail p={p} />
    </>
  );
}
