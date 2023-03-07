import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const ease = [0, 0.4, 0.2, 1];

export default function AnimatedMedia({ p, handleClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      onClick={handleClick}
      initial={{
        scale: 0.95,
      }}
      whileInView={{
        scale: 1,
        transition: {
          duration: 1,
          ease,
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 1,
          ease,
        },
      }}
      className={`aspect-[16/9] h-[60vh] max-w-[100vw] bg-[var(--color-background-dark)] rounded-xl sm:rounded-2xl overflow-hidden drop-shadow-2xl relative cursor-pointer top-[-5vh]`}
    >
      {p.videoUrl && (
        <motion.video
          ref={ref}
          className="object-cover h-full mx-auto"
          muted
          loop
          initial={{
            scale: 1.4,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1.1,
            transition: {
              duration: 1,
              ease,
            },
          }}
          whileHover={{
            scale: 1,
            transition: {
              duration: 1,
              ease,
            },
          }}
        >
          <source src={p.videoUrl} type="video/mp4" />
        </motion.video>
      )}
      {p.imageUrl && (
        <motion.img
          className="object-cover h-full"
          src={p.imageUrl}
          initial={{
            scale: 1.4,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1.1,
            transition: {
              duration: 1,
              ease,
            },
          }}
          whileHover={{
            scale: 1,
            transition: {
              duration: 1,
              ease,
            },
          }}
        />
      )}
    </motion.div>
  );
}
