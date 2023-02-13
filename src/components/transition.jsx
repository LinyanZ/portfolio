import { motion } from "framer-motion";
import { useTheme } from "../contexts/themeContext";

export default function Transition() {
  const [theme] = useTheme();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        transition: { delay: 0.5, duration: 0.5 },
      }}
      className={`transition-screen transition-screen--${theme}`}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    />
  );
}
