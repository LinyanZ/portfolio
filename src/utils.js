import * as THREE from "three";
import { useState, useEffect } from "react";

const damp = THREE.MathUtils.damp;

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

export { damp, useMediaQuery, useIsSmall, useIsMedium };
