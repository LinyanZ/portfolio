import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Html, Line, Plane, Svg, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useState } from "react";
import * as THREE from "three";
import { MyLink } from "./lib";
import { damp } from "../utils";

const links = [
  { link: "", label: "Home" },
  { link: "about", label: "About" },
  { link: "projects", label: "Projects" },
  { link: "contact", label: "Contact" },
];

function NavMenu({ open, setOpen, ...props }) {
  return (
    <Html fullscreen>
      <button
        className={`w-[32px] h-[32px] absolute left-[20px] top-[20px] ${
          open ? "text-neutral-800" : "text-neutral-100"
        } transition z-10`}
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Menu</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M80 160h352M80 256h352M80 352h352"
          />
        </svg>
      </button>
    </Html>
  );
}

export default function Nav({ transitionRef }) {
  const navigate = useNavigate();
  const { width, height } = useThree((state) => state.viewport);

  function handleClick(url) {
    setOpen(false);
    gsap.to(transitionRef.current.scale, {
      x: 15,
      y: 15,
      z: 15,
      duration: 1,
      onComplete: () => {
        navigate(url);
        gsap.to(transitionRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
        });
      },
    });
  }

  const backgroundWidth = Math.min(width, 2);
  const backgroundRef = useRef();
  const [open, setOpen] = useState(false);

  useFrame((_, delta) => {
    backgroundRef.current.position.x = damp(
      backgroundRef.current.position.x,
      open ? -(width - backgroundWidth) / 2 : -(backgroundWidth + width) / 2,
      8,
      delta
    );
    backgroundRef.current.children.forEach((c) => {
      c.position.x = damp(c.position.x, open ? 0.7 : 0.2, 8, delta);
    });
  });

  return (
    <group>
      <Plane
        ref={backgroundRef}
        args={[backgroundWidth, height]}
        position={[-(backgroundWidth + width) / 2, 0, 0]}
      >
        <meshBasicMaterial color="#d44d5c" />
        {links.map((l, i) => (
          <MyLink
            label={l.label}
            i={i}
            onClick={() => handleClick(l.link)}
            key={l.label}
          />
        ))}
      </Plane>
      <NavMenu open={open} setOpen={setOpen} />
    </group>
  );
}
