import { useEffect } from "react";

import LoadingScreen from "../components/loadingScreen";
import Hero from "../components/hero";
import Projects from "./projects";
import Summary from "../components/about/summary";
import Contact from "../components/contact";

import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";

function Home() {
  const [selectedProject] = useProject();

  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
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
