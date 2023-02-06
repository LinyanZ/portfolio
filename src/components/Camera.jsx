import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { damp, useMousePos } from "../utils";

const scale = 0.3;

export default function Camera() {
  const ref = useRef();
  const lookAtRef = useRef({ x: 0, y: 0 });
  const mousePos = useMousePos();

  useFrame((state, delta) => {
    const x = damp(lookAtRef.current.x, mousePos.x, 8, delta);
    const y = damp(lookAtRef.current.y, mousePos.y, 8, delta);

    lookAtRef.current.x = x;
    lookAtRef.current.y = y;

    // ref.current.lookAt(x * scale, y * scale, 0);
  });
  return (
    <PerspectiveCamera makeDefault ref={ref} position={[0, 0, 5]} fov={75} />
  );
}
