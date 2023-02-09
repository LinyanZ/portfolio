import { motion } from "framer-motion";

const start = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    height: 0,
    transition: {
      duration: 0.8,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const end = {
  initial: {
    height: 0,
    bottom: 0,
  },
  exit: {
    height: "100vh",
    transition: {
      duration: 0.8,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export default function Transition() {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={start}
        className="transition-screen"
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
        onAnimationComplete={() =>
          document.body.classList.remove("overflow-hidden")
        }
      />
      <motion.div
        initial="initial"
        exit="exit"
        variants={end}
        className="transition-screen"
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      />
    </>
  );
}
