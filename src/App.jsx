import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Three from "./components/Three";

import { ThemeToggler } from "./contexts/themeContext";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <>
      <Three />
      <Nav />
      <ThemeToggler />
      <AnimatePresence mode="wait">
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

export default App;
