import Transition from "../components/Transition";
import Hero from "../components/Hero";
import Project from "../components/Project";
import { useProject } from "../contexts/projectContext";
import projects from "../data/projects.json";

function Home() {
  const [project, setProject] = useProject();
  return (
    <>
      <Hero />
      <section>
        {projects.map((p) => (
          <Project project={p} key={p.title} />
        ))}
      </section>
      <Transition />
    </>
  );
}

export default Home;
