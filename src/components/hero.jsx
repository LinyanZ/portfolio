import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";

const name = {
  animate: {
    transition: {
      delayChildren: 2,
      staggerChildren: 0.15,
    },
  },
};

const description = {
  animate: {
    transition: {
      delayChildren: 3,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const AnimatedLetters = ({ text, delay, childrenDelay, ...props }) => {
  return (
    <div className="overflow-hidden">
      <motion.p variants={item} {...props} />
    </div>
  );
};

export default function Hero() {
  const [theme] = useTheme();

  return (
    <section
      className={`max-width-container vertical-center hero-section text--${theme}`}
    >
      <motion.div
        className="relative top-[-6vh]"
        variants={name}
        initial="initial"
        animate="animate"
      >
        <AnimatedLetters
          className="hero-text font-extralight"
          delay={2.4}
          childrenDelay={0.04}
        >
          Hi, I'm
        </AnimatedLetters>
        <AnimatedLetters
          className="hero-text font-bold "
          delay={2.6}
          childrenDelay={0.04}
        >
          Linyan Zhu
        </AnimatedLetters>
      </motion.div>
      <motion.div
        className="relative top-[-6vh]"
        variants={description}
        initial="initial"
        animate="animate"
      >
        <AnimatedLetters
          className="short-description font-light"
          delay={2.8}
          childrenDelay={0.04}
        >
          A Full-stack / Software Developer
        </AnimatedLetters>
        {/* <AnimatedLetters
          className="short-description"
          delay={2.8}
          childrenDelay={0.04}
        >
          /
        </AnimatedLetters>
        <AnimatedLetters
          className="short-description"
          delay={3}
          childrenDelay={0.04}
        >
          Software Developer
        </AnimatedLetters> */}
      </motion.div>
    </section>
  );
}
