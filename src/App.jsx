import { ScrollControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { useLocation } from "wouter";
import { useState } from "react";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Background from "./components/particles/Background";
import Nav from "./components/Nav";

import { useTheme, ThemeToggler } from "./contexts/themeContext";
import projects from "./data/projects.json";
import Transition from "./components/Transition";

function App() {
  const [theme] = useTheme();
  const [location] = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);

  return (
    <>
      <div className={`canvas-container canvas-container--${theme}`}>
        <Canvas>
          <Background />
          <Transition
            prevLocation={prevLocation}
            setPrevLocation={setPrevLocation}
          />
          {prevLocation === "/" && <Landing />}
          {prevLocation === "/about" && <About />}
          {prevLocation === "/projects" && (
            <ScrollControls pages={projects.length} damping={0.1}>
              <Projects />
            </ScrollControls>
          )}
          {prevLocation === "/contact" && <Contact />}
          <Perf position="top-right" />
        </Canvas>
      </div>
      <Nav />
      <ThemeToggler />
    </>
  );
}

export default App;
