import * as THREE from "three";
import useMediaQuery, {
  useIsLarge,
  useIsMedium,
  useIsSmall,
} from "./hooks/useMediaQuery";
import useMousePos from "./hooks/useMousePos";
import useWindowSize from "./hooks/useWindowSize";
import useObjectSize from "./hooks/useObjectSize";

const damp = THREE.MathUtils.damp;
const lerp = THREE.MathUtils.lerp;

export {
  damp,
  lerp,
  useMediaQuery,
  useIsSmall,
  useIsMedium,
  useIsLarge,
  useMousePos,
  useWindowSize,
  useObjectSize,
};
