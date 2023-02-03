import { Plane, ScrollControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import React from "react";

import Projects from "../pages/Projects";
import Background from "./particles/Background";

import { useTheme } from "../contexts/themeContext";
import projects from "../data/projects.json";

export default function Three({ showProjects }) {
  const [theme] = useTheme();

  return (
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
  );
}
