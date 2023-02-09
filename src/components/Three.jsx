import { Canvas } from "@react-three/fiber";
import React from "react";

import Background from "./particles/Background";
import { useTheme } from "../contexts/themeContext";
import { Perf } from "r3f-perf";

export default function Three() {
  const [theme] = useTheme();

  return (
    <div className={`canvas-container canvas-container--${theme}`}>
      <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
        <Background />
        <Perf position="top-left"/>
      </Canvas>
    </div>
  );
}
