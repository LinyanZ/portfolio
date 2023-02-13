import Transition from "../components/transition";
import Hero from "../components/hero";
import Project from "../components/project";
import projects from "../data/projects.json";
import Summary from "../components/about/summary";
import Contact from "../components/contact";
import { useTheme } from "../contexts/themeContext";

function Projects() {
  const [theme] = useTheme();

  return (
    <section className={`max-width-container mx-auto text--${theme}`}>
      <h1 className="projects-section-title">Projects</h1>
      {projects.map((p) => (
        <Project project={p} key={p.title} />
      ))}
    </section>
  );
}

function Home() {
  return (
    <>
      <Transition />
      <Hero />
      <Projects />
      <Summary />
      <Contact />
    </>
  );
}

export default Home;
