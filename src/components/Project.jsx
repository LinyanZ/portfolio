import { motion, useMotionValue } from "framer-motion";
import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";
import { useEffect, useRef } from "react";
import { useIsLarge } from "../utils";

function Video({ project }) {
  if (!project.videoUrl) return null;
  return (
    <motion.video layout className="project-media" autoPlay muted loop>
      <source src={project.videoUrl} type="video/mp4" />
    </motion.video>
  );
}

function Picture({ project }) {
  if (!project.pictureUrl) return null;
  return (
    <motion.img layout className="project-media" src={project.pictureUrl} />
  );
}

function ProjectDescription({ project }) {
  const [, setProject] = useProject();

  return (
    <motion.div layout className="project-description flex flex-col">
      <h2>{project.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fugiat
        suscipit veniam delectus assumenda, necessitatibus placeat esse
        consequuntur. Ipsa, quae? Quasi possimus ducimus.
      </p>
      <ul>
        {project.techStacks.map((t) => (
          <li key={`${project.title}:${t}`}>{t}</li>
        ))}
      </ul>
      <div className="flex w-full items-end gap-4 mt-auto">
        {project.externalLink && (
          <button className="project__link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-external-link"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>
        )}
        {project.githubLink && (
          <button className="project__link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-github"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </button>
        )}
        <button
          className="project__learn-more"
          onClick={() => setProject(project)}
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
}

const Overlay = ({ isSelected, ...props }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.8, ease: [0.6, 0, 0.12, 1] }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
    {...props}
  />
);

export default function Project({ project }) {
  const [theme] = useTheme();
  const [selectedProject] = useProject();
  const isSelected = selectedProject === project;

  const zIndex = useMotionValue(isSelected ? 2 : 0);

  const isLarge = useIsLarge();
  const projectHeight = useMotionValue(432);
  const shortDescriptionRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (!isLarge) {
        projectHeight.set(shortDescriptionRef.current.clientHeight);
      } else {
        projectHeight.set(432);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div className="project" style={{ height: projectHeight }}>
      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.6, 0, 0.12, 1] }}
        style={{ zIndex }}
        onLayoutAnimationStart={() => {
          zIndex.set(2);
        }}
        onLayoutAnimationComplete={() => {
          zIndex.set(isSelected ? 2 : 0);
        }}
        className={`max-width-container project-container ${
          isSelected ? "project-container--open" : ""
        } project-container--${theme} text--${theme}`}
      >
        <motion.div
          layout
          ref={shortDescriptionRef}
          className="project-short-description-container"
        >
          <Video project={project} />
          <Picture project={project} />
          <ProjectDescription project={project} />
        </motion.div>
        <motion.div layout style={{ width: "768px" }} className="p-4">
          {project.details}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export { Overlay };
