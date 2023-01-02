import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "./Particles";

function App() {
  const props = useControls("Main", {
    focus: { value: 50, min: 0, max: 100, step: 0.01 },
  });

  return (
    <div className="canvas-container">
      <Canvas>
        <OrbitControls />
        <color args={["#222222"]} attach="background" />
        <Particles />
      </Canvas>
    </div>
  );
}

export default App;
