import React, { useState, useEffect, Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Nav from "./components/Nav";
import Transition from "./components/Transition";
import Three from "./components/Three";

import { ThemeToggler } from "./contexts/themeContext";
import { Loader } from "@react-three/drei";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <About />,
    },
    {
      path: "/projects",
      element: <Projects />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (location.pathname === "/projects") {
      setTimeout(() => {
        setShowProjects(true);
      }, 1000);
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
          {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </Suspense>
      {/* <Loader /> */}
    </>
  );
}

export default App;
