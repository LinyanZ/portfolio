import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import Background from "./components/particles/Background";
import Landing from "./components/Landing";
import Projects from "./components/Projects";
import { useTheme, ThemeToggler } from "./contexts/themeContext";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import projects from "./data/projects.json";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  const [theme] = useTheme();

  return (
    <>
      <ThemeToggler />
      <div className={`canvas-container canvas-container--${theme}`}>
        <Canvas>
          {process.env.NODE_ENV === "development" && (
            <Perf position="top-left" />
          )}
          <Background />
          {/* <OrbitControls /> */}
          <ScrollControls pages={projects.length + 4} damping={0.1}>
            <Landing />
            <About />
            <Projects />
            <Contact />
          </ScrollControls>
        </Canvas>
      </div>
      {process.env.NODE_ENV === "development" && <Leva collapsed={true} />}
    </>
  );
}

export default App;
