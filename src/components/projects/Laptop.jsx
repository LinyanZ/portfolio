import React, { useRef, useEffect, Suspense } from "react";
import gsap from "gsap";
import { Mask, Plane, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { VideoMaterial } from "../lib";

export default function Laptop({ opacityRef }) {
  const { nodes: laptop } = useGLTF("/models/laptop.glb");
  const { nodes: plant } = useGLTF("/models/plant.glb");
  const groupRef = useRef();
  const videoRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    gsap.to(groupRef.current.rotation, {
      x: 0,
      y: -0.1,
      duration: 1,
    });
    gsap.to(groupRef.current.children[2].position, {
      y: 0,
      duration: 0.8,
      delay: 0.2,
    });
    gsap.to(groupRef.current.children[2].rotation, {
      x: -Math.PI / 2,
      duration: 0.8,
      delay: 0.2,
    });
  });

  // const { position, scale } = useControls({
  //   position: {
  //     x: 0,
  //     y: 1,
  //     z: -0.5,
  //   },
  //   scale: {
  //     x: 2.5,
  //     y: 1.7,
  //     z: 1,
  //   },
  // });

  useFrame(() => {
    // videoRef.current.position.x = position.x;
    // videoRef.current.position.y = position.y;
    // videoRef.current.position.z = position.z;
    // videoRef.current.scale.x = scale.x;
    // videoRef.current.scale.y = scale.y;
    // videoRef.current.scale.z = scale.z;
    if (materialRef.current) materialRef.current.opacity = opacityRef.value;
  });

  return (
    <group
      ref={groupRef}
      position={[0, -1.5, -1]}
      scale={[2, 2, 2]}
      rotation={[0.2, -0.1 - 0.8, 0]}
    >
      <Mask id={1} rotation={[-Math.PI / 2, 0, 0]}>
        <bufferGeometry {...laptop.bezel.geometry} />
      </Mask>
      <Mask id={1} rotation={[-Math.PI / 2, 0, 0]}>
        <bufferGeometry {...laptop.base.geometry} />
      </Mask>
      <Mask
        id={1}
        position={[0, -1.2, 0]}
        rotation={[-Math.PI / 2 + 1.2, 0, 0]}
      >
        <bufferGeometry {...laptop.screen.geometry} />
      </Mask>
      <Plane ref={videoRef} position={[0.1, 0.9, 0.6]} scale={[1.6, 0.9, 1.0]}>
        <Suspense fallback={<meshBasicMaterial transparent opacity={0} />}>
          <VideoMaterial
            ref={materialRef}
            url="./videos/test.mp4"
            opacity={0}
          />
        </Suspense>
      </Plane>
      <group position={[-2.6, 0, -0.8]} scale={[3, 3, 3]}>
        <Mask id={1}>
          <bufferGeometry {...plant.part2.geometry} />
        </Mask>
        <Mask id={1}>
          <bufferGeometry {...plant.part1.geometry} />
        </Mask>
      </group>
    </group>
  );
}

useGLTF.preload("/models/laptop.glb");
useGLTF.preload("/models/plant.glb");
