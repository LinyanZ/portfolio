import { Outlet } from "react-router-dom";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "../contexts/themeContext";
import Nav from "./Nav";
import { Circle } from "@react-three/drei";
import { useRef } from "react";

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
          <Nav transitionRef={transitionRef} />
          <Circle
            args={[1, 128]}
            ref={transitionRef}
            scale={[0, 0, 0]}
            position={[0, -10, 1]}
          />
        </Canvas>
      </div>
    </>
  );
}
