import Project from "./Project";
import projects from "../resources/projects.json";

function Projects() {
  return (
    <>
      {projects.map((project, index) => (
        <Project
          title={project.title}
          index={index}
          key={project.title}
          count={projects.length}
        />
      ))}
    </>
  );
}

export default Projects;
