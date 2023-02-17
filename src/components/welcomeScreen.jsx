import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../contexts/themeContext";
import { useEffect } from "react";

export default function WelcomeScreen() {
  const [theme] = useTheme();

  const animations = useAnimation();

  async function sequence() {
    await animations.start({ opacity: 1 });
    animations.start({ opacity: 0, transition: { delay: 1.2 } });
  }

  useEffect(() => {
    sequence();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={animations}
      className={`transition-screen transition-screen--${theme}`}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      {/* <motion.h1 className="text-[4rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem]">
        Welcome
      </motion.h1> */}
    </motion.div>
  );
}
