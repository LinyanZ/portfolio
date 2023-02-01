import { Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Circle } from "@react-three/drei";
import { useTheme, ThemeToggler } from "../contexts/themeContext";
import Background from "./particles/Background";
import Nav from "./Nav";

export default function Root() {
  const [theme] = useTheme();
  const transitionRef = useRef();

  return (
    <>
      <div className={`canvas-container canvas-container--${theme}`}>
        <Canvas>
          {/* {process.env.NODE_ENV === "development" && (
            <Perf position="top-left" />
          )} */}
          <Outlet />
          <Circle
            args={[1, 128]}
            ref={transitionRef}
            scale={[0, 0, 0]}
            position={[0, -10, 1]}
          />
          <Background />
        </Canvas>
      </div>
      <Nav transitionRef={transitionRef} />
      <ThemeToggler />
    </>
  );
}
