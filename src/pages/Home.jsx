import Transition from "../components/Transition";
import Hero from "../components/Hero";
import Project from "../components/Project";
import projects from "../data/projects.json";
import { useTheme } from "../contexts/themeContext";

function Home() {
  const [theme] = useTheme();

  return (
    <>
      <Hero />
      <section className={`max-width-container mx-auto text--${theme}`}>
        <h1 className="projects-section-title">Projects</h1>
        {projects.map((p) => (
          <Project project={p} key={p.title} />
        ))}
      </section>
      <Transition />
    </>
  );
}

export default Home;
