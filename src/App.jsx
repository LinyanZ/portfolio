import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import Background from "./components/particles/Background";
import Landing from "./components/Landing";
import Projects from "./components/Projects";

function App() {
  const { particles } = useControls("Main", {
    particles: { value: true },
  });

  return (
    <>
      <div className="html-container">
        <Landing />
        <Projects />
      </div>
      <div className="canvas-container">
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
