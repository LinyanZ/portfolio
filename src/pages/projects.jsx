import projects from "../data/projects.json";
import Project from "../components/projects/project";

export default function Projects() {
  return (
    <div className="h-[800vh] flex">
      {projects.map((p, i) => (
        <Project p={p} key={i} i={i} total={projects.length} />
      ))}
    </div>
  );
}
