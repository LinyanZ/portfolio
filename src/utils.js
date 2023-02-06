import * as THREE from "three";
import { useState, useEffect } from "react";

const damp = THREE.MathUtils.damp;
const lerp = THREE.MathUtils.lerp;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const useIsSmall = () => useMediaQuery("(min-width: 480px)");
const useIsMedium = () => useMediaQuery("(min-width: 641px)");

function useMousePos() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * -2 + 1,
    });
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePos;
}

export { damp, lerp, useMediaQuery, useIsSmall, useIsMedium, useMousePos };
