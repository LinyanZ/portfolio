import { motion, useMotionValue } from "framer-motion";
import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";
import { useEffect, useRef } from "react";
import { useIsLarge } from "../utils";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { ExternalLinkIcon, GithubIcon } from "./lib";

gsap.registerPlugin(CustomEase);

function Video({ project }) {
  if (!project.videoUrl) return null;
  return (
    <iframe
      src={`https://www.youtube.com/embed/${project.videoUrl}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="project-media"
    ></iframe>
  );
}

function Picture({ project }) {
  if (!project.pictureUrl) return null;
  return (
    <motion.img layout className="project-media" src={project.pictureUrl} />
  );
}

function ProjectSummary({ project, isSelected, expand, collapse }) {
  return (
    <motion.div layout className="project-summary flex flex-col">
      <h2>{project.title}</h2>
      <p>{project.summary}</p>
      <ul>
        {project.techStacks.map((t) => (
          <li key={`${project.title}:${t}`}>{t}</li>
        ))}
      </ul>
      <div className="flex w-full items-end gap-4 mt-auto">
        {project.externalLink && (
          <button
            className="project__link-icon"
            onClick={() => window.open(project.externalLink, "_blank").focus()}
          >
            <ExternalLinkIcon />
          </button>
        )}
        {project.githubLink && (
          <button
            className="project__link-icon"
            onClick={() => window.open(project.githubLink, "_blank").focus()}
          >
            <GithubIcon />
          </button>
        )}
        {isSelected && (
          <button className="project__learn-more" onClick={collapse}>
            Close
          </button>
        )}
        {!isSelected && (
          <button className="project__learn-more" onClick={expand}>
            Learn More
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ProjectDetails({ details }) {
  return (
    <motion.div layout className="project-details">
      {details.map((section) => (
        <div>
          <h3>{section.title}</h3>
          <p>{section.content}</p>
        </div>
      ))}
    </motion.div>
  );
}

const Overlay = ({ isSelected, ...props }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
    {...props}
  />
);

export default function Project({ project }) {
  const [theme] = useTheme();
  const [selectedProject, setSelectedProject] = useProject();
  const isSelected = selectedProject === project;

  const zIndex = useMotionValue(isSelected ? 2 : 0);

  const isLarge = useIsLarge();
  const projectHeight = useMotionValue(0);
  const summaryRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((e) => {
      if (!summaryRef.current) return;

      if (!isLarge) projectHeight.set(summaryRef.current.clientHeight);
      else projectHeight.set(432);
    });

    resizeObserver.observe(summaryRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  function expand() {
    zIndex.set(2);
    setSelectedProject(project);
  }

  function collapse() {
    setSelectedProject(null);
    gsap.to(containerRef.current, {
      scrollTop: 0,
      duration: 0.4,
      onComplete: () => {
        zIndex.set(0);
      },
    });
  }

  return (
    <motion.div className="project" style={{ height: projectHeight }}>
      <motion.div
        ref={containerRef}
        layout
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        style={{ zIndex }}
        className={`max-width-container project-container ${
          isSelected ? "project-container--open" : ""
        } project-container--${theme}`}
      >
        <motion.div
          layout
          ref={summaryRef}
          className="project-summary-container"
        >
          <Video project={project} />
          <Picture project={project} />
          <ProjectSummary
            project={project}
            isSelected={isSelected}
            expand={expand}
            collapse={collapse}
          />
        </motion.div>
        {project.details && <ProjectDetails details={project.details} />}
      </motion.div>
      <Overlay isSelected={isSelected} onClick={collapse} />
    </motion.div>
  );
}
