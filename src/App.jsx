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
    <>
      <div className="landing-section p-10 mx-auto max-w-7xl mt-40 ">
        <h1 className="text-6xl text-neutral-200 m-4 px-12 py-4 backdrop-blur-md bg-black/40 w-fit">
          I'M LINYAN ZHU
        </h1>
        <h1 className="text-6xl text-neutral-200 m-4 px-12 py-4 backdrop-blur-md bg-black/40 w-fit">
          WELCOME TO MY PORTFOLIO
        </h1>
      </div>
      <div className="canvas-container">
        <Canvas>
          <Perf position="top-left" />
          <OrbitControls />
          {particles && <Particles />}
        </Canvas>
      </div>
    </>
  );
}

export default App;
