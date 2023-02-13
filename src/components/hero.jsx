import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";

const AnimatedLetters = ({
  text,
  delay,
  childrenDelay,
  spaceWidth,
  ...props
}) => {
  return (
    <span {...props}>
      {[...text].map((letter, index) => (
        <motion.p
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
          style={letter === " " ? { width: spaceWidth } : {}}
        >
          {letter}
        </motion.p>
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
        spaceWidth={32}
        text="Hi, I'm"
      />
      <AnimatedLetters
        className="hero-text"
        delay={2.2}
        childrenDelay={0.04}
        spaceWidth={32}
        text="LINYAN ZHU"
      />
      <AnimatedLetters
        className="short-description"
        delay={2.4}
        childrenDelay={0.01}
        spaceWidth={8}
        text="A Full-Stack / Software Developer"
      />
    </section>
  );
}
