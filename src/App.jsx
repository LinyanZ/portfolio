import React from "react";

import Home from "./pages/home";
import Three from "./components/three";

import { ThemeToggler } from "./contexts/themeContext";

function App() {
  return (
    <>
      <Three />
      <ThemeToggler />
      <Home />
    </>
  );
}

export default App;
