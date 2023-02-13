import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";

const AnimatedLetters = ({ text, delay, childrenDelay, ...props }) => {
  const letters = text.split("");

  return (
    <span {...props}>
      {letters.map((letter, index) => (
        <motion.span
          className="inline-block"
          key={`${text} ${index}`}
          initial={{
            y: 400,
          }}
          animate={{
            y: 0,
            transition: {
              ease: [0.6, 0.01, -0.05, 0.95],
              duration: 1,
              delay: delay + index * childrenDelay,
            },
          }}
        >
          {letter === " " ? "\u00a0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  const [theme] = useTheme();

  return (
    <section
      className={`max-width-container vertical-center hero-section text--${theme}`}
    >
      <AnimatedLetters
        className="hero-text"
        delay={2}
        childrenDelay={0.04}
        text="Hi, I'm"
      />
      <AnimatedLetters
        className="hero-text"
        delay={2.2}
        childrenDelay={0.04}
        text="LINYAN ZHU"
      />
      <AnimatedLetters
        className="short-description"
        delay={2.4}
        childrenDelay={0.01}
        text="A Full-Stack / Software Developer"
      />
    </section>
  );
}
