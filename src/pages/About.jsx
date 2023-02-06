import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Summary from "../components/about/Summary";
import Education from "../components/about/Education";
import Experiences from "../components/about/Experiences";
import Skills from "../components/about/Skills";
import Transition from "../components/Transition";
import { useTheme } from "../contexts/themeContext";
import Contact from "./Contact";

function About() {
  const [theme] = useTheme();

  return (
    <div>
      <section className="max-width-container vertical-center hero-section">
        <h1 className={`hero-text hero--top-left text--${theme}`}>
          Hi, I'm <br />
          LINYAN ZHU
        </h1>
        <p className={`short-description text--${theme}`}>
          A Full-Stack / Software Developer
        </p>
      </section>
      <Summary />
      <Skills />
      <Education />
      <Experiences />
      <Contact />
      <Transition />
    </div>
  );
}

export default About;
