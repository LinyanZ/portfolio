import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Plane, Text, Line, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useState } from "react";
import * as THREE from "three";
import { damp } from "../utils";

function Tag({ text, theme }) {
  return (
    <div className={`tag tag--${theme}`}>
      <p>{text}</p>
    </div>
  );
}

function MyLink({ label, i, ...props }) {
  const { height } = useThree((state) => state.viewport);
  const [hover, setHover] = useState(false);
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.fillOpacity = damp(
      ref.current.fillOpacity,
      hover ? 1 : 0.8,
      8,
      delta
    );
  });

  return (
    <Text
      ref={ref}
      fontSize={0.25}
      position={[-2, height / 2 - 0.5 - 0.5 * i, 0]}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHover(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setHover(false);
      }}
      anchorX="right"
      anchorY="top"
      font={"/fonts/Raleway-ExtraLight.ttf"}
      color="#ffffff"
      {...props}
    >
      {label}
    </Text>
  );
}

export { Tag, MyLink };
