import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import Transition from "./components/Transition";
import Three from "./components/Three";

import { ThemeToggler } from "./contexts/themeContext";
import { Loader } from "@react-three/drei";

function App() {
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
      <Suspense fallback={null}>
        <Three showProjects={showProjects} />
        <Nav />
        <ThemeToggler />
        <AnimatePresence mode="wait">
          {location === "/" && <About key="about" />}
          {location === "/projects" && <Transition key="projects" />}
          {location === "/contact" && <Contact key="contact" />}
        </AnimatePresence>
      </Suspense>
      <Loader />
    </>
  );
}

export default App;
