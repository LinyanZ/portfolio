import {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  forwardRef,
} from "react";

import LoadingScreen from "../components/loadingScreen";
import Hero from "../components/hero";
// import Project from "../components/project";
import projects from "../data/projects.json";
import Summary from "../components/about/summary";
import Contact from "../components/contact";

import { useTheme } from "../contexts/themeContext";
import { useProject } from "../contexts/projectContext";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const ease = [0, 0.4, 0.2, 1];

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function useObjectSize(objRef) {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      if (objRef.current) {
        setSize([objRef.current.clientWidth, objRef.current.clientHeight]);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [objRef]);

  return size;
}

const Project = ({ p, i, total }) => {
  const [theme] = useTheme();
  const { scrollYProgress } = useScroll();
  const ySpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.00001,
  });

  const ref = useRef(null);
  const [imgWidth, imgHeight] = useObjectSize(ref);
  const [windowWidth, windowHeight] = useWindowSize();

  const margin = (windowWidth - imgWidth) / 2 - 20;

  const x = useTransform(
    ySpring,
    [0, i / total, (i + 1) / total, 1],
    [
      windowWidth - margin,
      windowWidth - margin,
      -windowWidth + margin,
      -windowWidth + margin,
    ]
  );

  const textX = useTransform(
    ySpring,
    [0, i / total, (i + 1) / total, 1],
    [
      windowWidth + 100,
      windowWidth + 100,
      -windowWidth - 100,
      -windowWidth - 100,
    ]
  );

  return (
    <motion.div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center pointer-events-none">
      <motion.div
        className="w-fit mx-auto pointer-events-auto"
        ref={ref}
        style={{ x }}
      >
        <AnimatedPicture
          src={p.videoUrl}
          handleClick={() => console.log("test")}
        />
        <motion.h2
          className={`text-[5rem] text--${theme} font-medium absolute top-0 left-0 w-full text-center drop-shadow-2xl`}
          style={{
            x: textX,
            y: imgHeight * 1.03,
          }}
        >
          {p.title}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
};

const AnimatedPicture = ({ src, handleClick }) => {
  return (
    <motion.div
      onClick={handleClick}
      initial={{
        scale: 0.95,
      }}
      whileInView={{
        scale: 1,
        transition: {
          duration: 1,
          ease,
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 1,
          ease,
        },
      }}
      className="aspect-[16/9] h-[60vh] max-w-[100vw] bg-black overflow-hidden drop-shadow-2xl"
    >
      <motion.video
        className="object-cover h-full"
        autoPlay
        muted
        loop
        preload
        initial={{
          scale: 1.6,
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1.1,
          transition: {
            duration: 1,
            ease,
          },
        }}
        whileHover={{
          scale: 1,
          transition: {
            duration: 1,
            ease,
          },
        }}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};

function Projects() {
  const [theme] = useTheme();

  return (
    // <section className={`max-width-container mx-auto text--${theme}`}>
    //   <h1 className="projects-section-title">Projects</h1>
    //   {projects.map((p) => (
    //     <Project project={p} key={p.title} />
    //   ))}
    // </section>
    <div className="h-[800vh] flex">
      {projects.map((p, i) => (
        <Project p={p} key={i} i={i} total={projects.length} />
      ))}
    </div>
  );
}

function Home() {
  const [selectedProject] = useProject();

  useEffect(() => {
    if (selectedProject) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [selectedProject]);

  return (
    <div>
      <LoadingScreen />
      <Hero />
      <Projects />
      {/* <Summary />
      <Contact /> */}
    </div>
  );
}

export default Home;
