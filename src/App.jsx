import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "./Particles";

function App() {
  const props = useControls("Particles", {
    focus: { value: 50, min: 0, max: 100, step: 0.01 },
    speed: { value: 0.001, min: 0, max: 0.1, step: 0.0001 },
    blur: { value: 0.3, min: 0, max: 2, step: 0.0001 },
    fade: { value: 0.9, min: 0, max: 2, step: 0.0001 },
    pointSize: { value: 1, min: 0, max: 3, step: 0.0001 },
  });

  return (
    <div className="canvas-container">
      <Canvas>
        <OrbitControls />
        <color args={["#222222"]} attach="background" />
        <Particles {...props} />
      </Canvas>
    </div>
  );
}

export default App;
