import { useState, useLayoutEffect, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// import Project from "../components/project";
import projects from "../data/projects.json";
import AnimatedMedia from "../components/projects/animatedMedia";
import ExternalLinkIcon from "../components/projects/externalLinkIcon";
import GithubIcon from "../components/projects/githubIcon";

import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";

import { useWindowSize, useObjectSize } from "../utils";

const Overlay = ({ isSelected, ...props }) => (
  <motion.div
    initial={{}}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
    {...props}
  />
);

const ProjectDetail = ({ p }) => {
  const [theme] = useTheme();
  const [_, windowHeight] = useWindowSize();
  const [selectedProject, setSelectedProject] = useProject();
  const isSelected = selectedProject === p;
  return (
    <>
      <Overlay
        isSelected={isSelected}
        onClick={() => setSelectedProject(null)}
      />
      <motion.div
        key={`${p.title} details`}
        layout
        initial={{ y: windowHeight }}
        className={`fixed ${
          isSelected ? "top-[20vh]" : "top-[120vh]"
        } left-0 md:left-[10vw] w-screen md:w-[80vw] h-[80vh] bg-black z-[2] rounded-t-[40px] project-details project-details--${theme} drop-shadow-2xl`}
      >
        <h2>{p.title}</h2>
        {p.youtubeUrl && (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${p.videoUrl}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
        <p>{p.summary}</p>
        <ul>
          {p.tags.map((t) => (
            <li key={`${p.title}:${t}`}>{t}</li>
          ))}
        </ul>
        <div className="project-tags-links-container">
          {p.externalLink && (
            <button
              className="project__link-icon"
              onClick={() => window.open(p.externalLink, "_blank").focus()}
            >
              <ExternalLinkIcon />
            </button>
          )}
          {p.githubLink && (
            <button
              className="project__link-icon"
              onClick={() => window.open(p.githubLink, "_blank").focus()}
            >
              <GithubIcon />
            </button>
          )}
        </div>
        {p.details.map((section) => (
          <div key={`${p.title} ${section.title}`}>
            <h3>{section.title}</h3>
            {section.content.map((paragraph, index) => (
              <p key={`${p.title} ${section.title} ${index}`}>{paragraph}</p>
            ))}
          </div>
        ))}
      </motion.div>
    </>
  );
};

const Project = ({ p, i, total }) => {
  const [theme] = useTheme();

  const ref = useRef(null);
  const [mediaWidth, mediaHeight] = useObjectSize(ref);
  const [windowWidth, windowHeight] = useWindowSize();
  const margin = (windowWidth - mediaWidth) / 2 - 20;

  const [selectedProject, setSelectedProject] = useProject();
  const isSelected = selectedProject === p;

  const { scrollYProgress } = useScroll();
  const ySpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.00001,
  });

  const mediaX = useTransform(
    ySpring,
    [0, i / total, (i + 1) / total, 1],
    [
      windowWidth - margin,
      windowWidth - margin,
      -windowWidth + margin,
      -windowWidth + margin,
    ]
  );

  const textX = useTransform(
    ySpring,
    [0, i / total, (i + 1) / total, 1],
    [
      windowWidth + 100,
      windowWidth + 100,
      -windowWidth - 100,
      -windowWidth - 100,
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
};

export default function Projects() {
  return (
    // <section className={`max-width-container mx-auto text--${theme}`}>
    //   <h1 className="projects-section-title">Projects</h1>
    //   {projects.map((p) => (
    //     <Project project={p} key={p.title} />
    //   ))}
    // </section>
    <div className="h-[800vh] flex">
      {projects.map((p, i) => (
        <Project p={p} key={i} i={i} total={projects.length} />
      ))}
    </div>
  );
}
