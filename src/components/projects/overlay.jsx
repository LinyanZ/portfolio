import { motion } from "framer-motion";

const Overlay = ({ isSelected, ...props }) => (
  <motion.div
    initial={{}}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
    {...props}
  />
);

export default Overlay;
