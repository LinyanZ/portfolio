import { ScrollControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import { useLocation, Route } from "wouter";

import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Background from "./components/particles/Background";
import Nav from "./components/Nav";

import { useTheme, ThemeToggler } from "./contexts/themeContext";
import projects from "./data/projects.json";
import { AnimatePresence, motion } from "framer-motion";
import Transition from "./components/Transition";

function App() {
  const [theme] = useTheme();
  const [location] = useLocation();
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (location === "/projects") {
      setTimeout(() => {
        setShowProjects(true);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowProjects(false);
      }, 1000);
    }
  }, [location]);

  return (
    <>
      <div className={`canvas-container canvas-container--${theme}`}>
        <Canvas>
          <Background />
          {showProjects && (
            <ScrollControls pages={projects.length} damping={0.1}>
              <Projects />
            </ScrollControls>
          )}
          {process.env.NODE_ENV === "development" && (
            <Perf position="top-right" />
          )}
        </Canvas>
      </div>
      <Nav />
      <ThemeToggler />
      <AnimatePresence mode="wait">
        {location === "/" && <About key="about" />}
        {location === "/projects" && <Transition key="projects" />}
        {location === "/contact" && <Contact key="contact" />}
      </AnimatePresence>
    </>
  );
}

export default App;
