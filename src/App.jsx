import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import Background from "./components/particles/Background";
import Landing from "./components/Landing";
import Projects from "./components/projects/Projects";
import { useTheme, ThemeToggler } from "./contexts/themeContext";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import projects from "./resources/projects.json";

function App() {
  const [theme] = useTheme();

  return (
    <>
      <div className="html-container">
        <ThemeToggler />
      </div>
      <div className={`canvas-container canvas-container--${theme}`}>
        <Canvas>
          {process.env.NODE_ENV === "development" && (
            <Perf position="top-left" />
          )}
          <Background />
          {/* <OrbitControls /> */}

          <ScrollControls pages={projects.length} damping={0.01}>
            {/* <Landing /> */}
            <Projects />
          </ScrollControls>
        </Canvas>
      </div>
      {process.env.NODE_ENV === "development" && <Leva collapsed={true} />}
    </>
  );
}

export default App;
