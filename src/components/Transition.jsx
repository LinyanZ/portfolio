import gsap from "gsap";
import { useLocation } from "wouter";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Transition({ prevLocation, setPrevLocation }) {
  const [location] = useLocation();
  const { width, height } = useThree((state) => state.viewport);

  const ref = useRef();

  useFrame(() => {
    if (location !== prevLocation) {
      gsap.to(ref.current.position, {
        y: 0,
        duration: 0.4,
        onComplete: () => {
          setPrevLocation(location);

          gsap.to(ref.current.position, {
            y: height,
            duration: 0.2,
            onComplete: () => {
              ref.current.position.y = -height;
            },
          });
        },
      });
    }
  });

  return (
    <Plane ref={ref} args={[width, height]} position={[0, -height, 1]}>
      <meshBasicMaterial color="#6c757d" />
    </Plane>
  );
}
