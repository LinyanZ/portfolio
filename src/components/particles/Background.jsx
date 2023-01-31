import Particles from "./Particles";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const defaultAttributes = {
  speed: 0.001,
  opacity: 0,
  blur: 0.3,
  fade: 0.9,
  pointSize: 1,
  sizeXY: 150,
  focus: 50,
  sizeZ: 30,
  offsetZ: 50,
};

const Background = () => {
  const burstAnimation = useRef({
    ...defaultAttributes,
    sizeZ: 10000,
    offsetZ: 600,
    focus: -500,
  });
  const smallParticlesAnimation = useRef({
    ...defaultAttributes,
  });
  const mediumParticlesAnimation = useRef({
    ...defaultAttributes,
    blur: 0.4,
    sizeZ: 400,
  });

  function burst() {
    // out-of-focus to focus
    gsap.to(burstAnimation.current, {
      duration: 0.3,
      focus: 50,
      sizeZ: 30,
      offsetZ: 50,
    });

    // movement speed
    gsap.to(burstAnimation.current, {
      duration: 0.5,
      speed: 0.8,
      ease: "power4.out",
    });
    gsap.to(burstAnimation.current, {
      duration: 3,
      speed: 0.002,
      delay: 0.5,
      ease: "power4.out",
    });

    // opacity
    gsap.to(burstAnimation.current, {
      duration: 2,
      opacity: 1,
    });
    gsap.to(burstAnimation.current, {
      duration: 6,
      opacity: 0,
      delay: 2.5,
    });
  }

  function background() {
    // small particles' opacity and speed
    gsap.to(smallParticlesAnimation.current, {
      duration: 4,
      opacity: 1,
      delay: 1,
    });
    gsap.to(smallParticlesAnimation.current, {
      duration: 0.7,
      speed: 0.8,
    });
    gsap.to(smallParticlesAnimation.current, {
      duration: 3,
      speed: 0.001,
      delay: 0.8,
      ease: "power4.out",
    });

    // medium particles' opacity and speed
    gsap.to(mediumParticlesAnimation.current, {
      duration: 4,
      opacity: 0.8,
      delay: 1,
    });
    gsap.to(mediumParticlesAnimation.current, {
      duration: 0.7,
      speed: 0.8,
    });
    gsap.to(mediumParticlesAnimation.current, {
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
      <Particles count={500} animation={burstAnimation.current} />
      <Particles count={300} animation={smallParticlesAnimation.current} />
      <Particles count={100} animation={mediumParticlesAnimation.current} />
    </>
  );
};

export default Background;
