import Transition from "../components/Transition";
import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";
import projects from "../data/projects.json";
import { AnimatePresence, motion } from "framer-motion";

function Projects() {
  const [theme] = useTheme();
  const [project] = useProject();

  const nameStyle = `text-center text-[4rem] font-thin h-48 z-10 ${
    theme === "dark" ? "text-neutral-200" : "text-neutral-700"
  }`;

  return (
    <>
      {project >= 0 && (
        <div
          className={`flex-column flex h-fit w-full mt-20 items-center justify-center pointer-events-none`}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={projects[project].title}
              className={nameStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projects[project].title}
            </motion.h1>
          </AnimatePresence>
        </div>
      )}
      <Transition />
    </>
  );
}

export default Projects;
