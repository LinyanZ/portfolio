import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../contexts/themeContext";
import { useEffect } from "react";

const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const Dot = ({ delay }) => {
  const [theme] = useTheme();

  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: 16,
        transition: {
          delay,
          duration: 0.3,
          repeat: Infinity,
          repeatType: "mirror",
        },
      }}
      className={`inline m-2 w-2 h-2 ${
        theme === "dark" ? "bg-white" : "bg-black"
      }`}
    />
  );
};

export default function LoadingScreen() {
  const [theme] = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 1.5 } }}
      className={`transition-screen transition-screen--${theme}`}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="flex h-4"
      >
        <Dot delay={0} />
        <Dot delay={0.1} />
        <Dot delay={0.2} />
      </motion.div>
    </motion.div>
  );
}
