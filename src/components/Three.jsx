import { Canvas } from "@react-three/fiber";
import React from "react";

import Background from "./particles/Background";
import { useTheme } from "../contexts/themeContext";

export default function Three() {
  const [theme] = useTheme();

  return (
    <div className={`canvas-container canvas-container--${theme}`}>
      <Canvas>
        <Background />
      </Canvas>
    </div>
  );
}
