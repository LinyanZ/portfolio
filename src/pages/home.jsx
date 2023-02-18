import { useState, useEffect } from "react";

import LoadingScreen from "../components/loadingScreen";
import Hero from "../components/hero";
import Project from "../components/project";
import projects from "../data/projects.json";
import Summary from "../components/about/summary";
import Contact from "../components/contact";

import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";

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
  const [selectedProject] = useProject();

  useEffect(() => {
    if (selectedProject) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [selectedProject]);

  return (
    <div>
      <LoadingScreen />
      <Hero />
      <Projects />
      <Summary />
      <Contact />
    </div>
  );
}

export default Home;
