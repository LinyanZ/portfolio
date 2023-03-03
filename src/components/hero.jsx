import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";

const AnimatedLetters = ({ text, delay, ...props }) => {
  return (
    <div className="overflow-hidden">
      <motion.p
        initial={{ y: 400 }}
        animate={{
          y: 0,
          transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1,
            delay,
          },
        }}
        {...props}
      />
    </div>
  );
};

export default function Hero() {
  const [theme] = useTheme();

  return (
    <section
      className={`max-width-container vertical-center hero-section text--${theme}`}
    >
      <div className="relative top-[-5vh]">
        <AnimatedLetters className="hero-text font-extralight" delay={3.5}>
          Hi, I'm
        </AnimatedLetters>
      </div>
      <div className="relative top-[-7vh]">
        <AnimatedLetters className="hero-text font-medium" delay={0.1 + 3.5}>
          Linyan Zhu
        </AnimatedLetters>
      </div>
      <div className="relative top-[-6vh]">
        <AnimatedLetters
          className="short-description font-light"
          delay={0.8 + 3.5}
        >
          A Full-stack / Software Developer
        </AnimatedLetters>
      </div>
    </section>
  );
}
