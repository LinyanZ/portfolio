import { useEffect, useState } from "react";

import LoadingScreen from "../components/loadingScreen";
import Hero from "../components/hero";
import Projects from "./projects";
import Summary from "../components/summary";
import Contact from "../components/contact";

import { useProject } from "../contexts/projectContext";
import { ThemeToggler } from "../contexts/themeContext";
import { LanguageToggler, useLanguage } from "../contexts/languageContext";

import projects from "../data/projects.json";

function Home() {
  const [selectedProject] = useProject();
  const [language] = useLanguage();

  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
  }, [selectedProject]);

  return (
    <>
      {/* <LoadingScreen /> */}
      <Hero />
      <Projects projects={language === "en" ? projects.en : projects.zh} />
      <Summary />
      <Contact />
      <LanguageToggler />
      <ThemeToggler />
    </>
  );
}

export default Home;
