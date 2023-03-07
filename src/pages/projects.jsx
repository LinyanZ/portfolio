import projects from "../data/projects.json";
import Project from "../components/projects/project";
import { useRef } from "react";
import { useScroll } from "framer-motion";

export default function Projects() {
  const touchEventRef = useRef({ touchStart: null, touchEnd: null });
  const minSwipeDistance = 100;

  const onTouchStart = (e) => {
    touchEventRef.current = {
      touchStart: e.targetTouches[0].clientX,
      touchEnd: null,
    };
  };

  const onTouchMove = (e) => {
    touchEventRef.current.touchEnd = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const { touchStart, touchEnd } = touchEventRef.current;
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      const scrollAmount = (distance / window.innerWidth) * window.innerHeight;
      window.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div
      className="h-[800vh] flex"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {projects.map((p, i) => (
        <Project p={p} key={i} i={i} total={projects.length} />
      ))}
    </div>
  );
}
