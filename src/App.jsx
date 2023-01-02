import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "./Particles";
import { Perf } from "r3f-perf";

function App() {
  const { particles } = useControls("Main", {
    particles: { value: true },
  });

  return (
    <div className="canvas-container">
      <Canvas>
        <Perf position="top-left" />
        <OrbitControls />
        {particles && <Particles />}
      </Canvas>
    </div>
  );
}

export default App;
