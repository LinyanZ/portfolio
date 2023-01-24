import Particles from "./Particles";
import { useLayoutEffect } from "react";
import gsap from "gsap";

const Background = () => {
  const burstAnimation = {
    speed: 0.001,
    opacity: 0,
    blur: 0.3,
    fade: 0.9,
    pointSize: 1,
    sizeXY: 250,
    sizeZ: 10000,
    offsetZ: 600,
    focus: -500,
  };
  const backgroundSmallAnimation = {
    speed: 0.001,
    opacity: 0,
    blur: 0.3,
    fade: 0.9,
    pointSize: 1,
    sizeXY: 250,
    focus: 50,
    sizeZ: 30,
    offsetZ: 50,
  };
  const backgroundMediumAnimation = {
    speed: 0.001,
    opacity: 0,
    blur: 0.4,
    fade: 0.9,
    pointSize: 1,
    sizeXY: 250,
    focus: 50,
    sizeZ: 400,
    offsetZ: 50,
  };

  function burst() {
    // out-of-focus to focus
    gsap.to(burstAnimation, {
      duration: 0.3,
      focus: 50,
      sizeZ: 30,
      offsetZ: 50,
    });

    // movement speed
    gsap.to(burstAnimation, {
      duration: 0.5,
      speed: 0.8,
      ease: "power4.out",
    });
    gsap.to(burstAnimation, {
      duration: 3,
      speed: 0.002,
      delay: 0.5,
      ease: "power4.out",
    });

    // opacity
    gsap.to(burstAnimation, {
      duration: 1,
      opacity: 1,
      delay: 0.1,
    });
    gsap.to(burstAnimation, {
      duration: 6,
      opacity: 0,
      delay: 2.5,
    });
  }

  function background() {
    gsap.to(backgroundSmallAnimation, {
      duration: 4,
      opacity: 1,
      delay: 1,
    });
    gsap.to(backgroundSmallAnimation, {
      duration: 0.7,
      speed: 0.8,
    });
    gsap.to(backgroundSmallAnimation, {
      duration: 3,
      speed: 0.001,
      delay: 0.8,
      ease: "power4.out",
    });

    gsap.to(backgroundMediumAnimation, {
      duration: 4,
      opacity: 0.8,
      delay: 1,
    });
    gsap.to(backgroundMediumAnimation, {
      duration: 0.7,
      speed: 0.8,
    });
    gsap.to(backgroundMediumAnimation, {
      duration: 3,
      speed: 0.002,
      delay: 0.8,
      ease: "power4.out",
    });
  }

  useLayoutEffect(() => {
    burst();
    background();
  }, []);

  return (
    <>
      <Particles count={1000} animation={burstAnimation} />
      <Particles count={300} animation={backgroundSmallAnimation} />
      <Particles count={100} animation={backgroundMediumAnimation} />
    </>
  );
};

export default Background;
