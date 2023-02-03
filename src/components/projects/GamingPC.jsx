import React, { useRef, useEffect, Suspense } from "react";
import gsap from "gsap";
import { Mask, Plane, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { VideoMaterial } from "../lib";

export function GamingPC({ opacityRef }) {
  const { nodes } = useGLTF("/models/gaming_pc.glb");
  const groupRef = useRef();
  const videoRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    gsap.to(groupRef.current.rotation, { x: 0, y: -Math.PI / 2, duration: 1 });
  });

  useFrame(() => {
    if (materialRef.current) materialRef.current.opacity = opacityRef.value;
  });

  return (
    <group
      ref={groupRef}
      scale={[1, 1, 1]}
      rotation={[-Math.PI / 12, -Math.PI / 2 + 0.4, 0]}
      position={[1.04, -2, 0]}
    >
      <Plane
        ref={videoRef}
        position={[0.5, 2.67, 2.3]}
        rotation={[0, 1.71, 0]}
        scale={[4.44, 2.5, 1.0]}
      >
        <Suspense fallback={<meshBasicMaterial transparent opacity={0} />}>
          <VideoMaterial
            ref={materialRef}
            url="./videos/thirdPersonShooter.mp4"
            opacity={0}
          />
        </Suspense>
      </Plane>
      <Mask
        id={1}
        position={[-1.39, 2.96, 2.79]}
        rotation={[-2.72, 1.4, 2.73]}
        scale={[3.25, 1.84, 0.04]}
      >
        <bufferGeometry {...nodes.Monitor.geometry} />
      </Mask>
      <Mask id={1} position={[-2.93, 2, -3]} scale={[1.73, 1.57, 0.9]}>
        <bufferGeometry {...nodes.PC.geometry} />
      </Mask>
      <Mask
        id={1}
        position={[1.7, 0.32, -1.7]}
        rotation={[Math.PI, -0.26, Math.PI]}
        scale={[-0.43, -0.23, -0.43]}
      >
        <bufferGeometry {...nodes.Mouse.geometry} />
      </Mask>
      <Mask
        id={1}
        position={[2.01, 0.35, 1.71]}
        rotation={[-1.55, 0.09, 1.39]}
        scale={0.91}
      >
        <bufferGeometry {...nodes.Keyboard.geometry} />
      </Mask>
    </group>
  );
}

export default GamingPC;

useGLTF.preload("/models/gaming_pc.glb");
