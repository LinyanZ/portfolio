import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import Background from "./components/particles/Background";
import Landing from "./components/Landing";
import Projects from "./components/Projects";
import { useTheme, ThemeToggler } from "./contexts/themeContext";

function App() {
  const { particles } = useControls("Main", {
    particles: { value: true },
  });
  const [theme] = useTheme();

  return (
    <>
      <div className="html-container">
        <Landing />
        <Projects />
        <ThemeToggler />
      </div>
      <div className={`canvas-container canvas-container--${theme}`}>
        <Canvas>
          {process.env.NODE_ENV === "development" && (
            <Perf position="top-left" />
          )}
          {particles && <Background />}
        </Canvas>
      </div>
      {process.env.NODE_ENV === "development" && <Leva collapsed={true} />}
    </>
  );
}

export default App;
