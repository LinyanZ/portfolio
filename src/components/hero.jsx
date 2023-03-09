import { useTheme } from "../contexts/themeContext";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/languageContext";

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
  const [language] = useLanguage();

  return (
    <>
      <section
        className={`max-width-container vertical-center hero-section text--${theme}`}
      >
        <div className="relative top-[-5vh]">
          <AnimatedLetters className="hero-text font-extralight" delay={3.5}>
            {language === "en" ? "Hi, I'm" : "嗨，"}
          </AnimatedLetters>
        </div>
        <div className="relative top-[-7vh]">
          <AnimatedLetters className="hero-text font-medium" delay={0.1 + 3.5}>
            {language === "en" ? "Linyan Zhu" : "我是朱临砚"}
          </AnimatedLetters>
        </div>
        <div className="relative top-[-6vh]">
          <AnimatedLetters
            className="short-description font-light"
            delay={0.8 + 3.5}
          >
            {language === "en"
              ? "A Full-stack / Software Developer"
              : "一个全栈 / 软件开发程序猿"}
          </AnimatedLetters>
        </div>
      </section>
    </>
  );
}
