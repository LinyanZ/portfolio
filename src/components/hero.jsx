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
      <div>
        <AnimatedLetters
          className="hero-text inline-block w-fit mr-8"
          delay={2.2}
          childrenDelay={0.04}
          text="LINYAN"
        />
        <AnimatedLetters
          className="hero-text inline-block w-fit"
          delay={2.2}
          childrenDelay={0.04}
          text="ZHU"
        />
      </div>
      <div>
        <AnimatedLetters
          className="short-description inline-block mr-4"
          delay={2.4}
          childrenDelay={0.01}
          text="A Full-Stack"
        />
        <AnimatedLetters
          className="short-description inline-block mr-4"
          delay={2.53}
          childrenDelay={0.01}
          text="/"
        />
        <AnimatedLetters
          className="short-description inline-block mr-4"
          delay={2.54}
          childrenDelay={0.01}
          text="Software"
        />
        <AnimatedLetters
          className="short-description inline-block mr-4"
          delay={2.62}
          childrenDelay={0.01}
          text="Developer"
        />
      </div>
    </section>
  );
}
