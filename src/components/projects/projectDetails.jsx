import { motion } from "framer-motion";

import ExternalLinkIcon from "../icons/externalLinkIcon";
import GithubIcon from "../icons/githubIcon";
import YoutubePlayer from "./youtubePlayer";
import Overlay from "./overlay";

import { useTheme } from "../../contexts/themeContext";
import { useProject } from "../../contexts/projectContext";
import { useWindowSize } from "../../utils";

const ProjectDetail = ({ p }) => {
  const [theme] = useTheme();
  const [_, windowHeight] = useWindowSize();
  const [selectedProject, setSelectedProject] = useProject();
  const isSelected = selectedProject === p.id;
  return (
    <>
      <Overlay
        isSelected={isSelected}
        onClick={() => setSelectedProject(null)}
      />
      <motion.div
        key={`${p.id} details`}
        layout
        initial={{ y: windowHeight }}
        className={`fixed ${
          isSelected ? "top-[15vh]" : "top-[115vh]"
        } left-0 md:left-[10vw] w-screen md:w-[80vw] h-[85vh] bg-black z-[2] rounded-t-xl sm:rounded-t-2xl project-details text--${theme} project-details--${theme} drop-shadow-2xl`}
      >
        <h2>{p.title}</h2>
        {p.youtubeUrl && (
          <YoutubePlayer
            p={p}
            iframeClassName="w-full h-full rounded-lg sm:rounded-xl"
            className="w-full aspect-video"
          />
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
              className="icon"
              onClick={() => window.open(p.externalLink, "_blank").focus()}
            >
              <ExternalLinkIcon />
            </button>
          )}
          {p.githubLink && (
            <button
              className="icon"
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

export default ProjectDetail;
