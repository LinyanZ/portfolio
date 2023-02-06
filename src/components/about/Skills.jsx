import { useTheme } from "../../contexts/themeContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMedium } from "../../utils";
import { useRef } from "react";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function SkillGroup({ index, label, skills, scrollRef }) {
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useParallax(scrollYProgress, 200 - index * 50);
  const isMedium = useIsMedium();

  const [theme] = useTheme();

  return (
    <motion.div
      className={`skill-group-container skill-group-container--${theme}`}
      style={isMedium ? { y } : {}}
    >
      <h3 className="skill-group__label">{label}</h3>
      <ul className={`skills-container skills-container--${theme}`}>
        {skills.map((s) => (
          <li key={s} className="skill">
            {s}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Skills({}) {
  const [theme] = useTheme();
  const ref = useRef(null);

  return (
    <section
      className={`max-width-container vertical-center mx-auto my-32 sm:my-64 text--${theme}`}
    >
      <h2 className="section-title">Skills</h2>
      <div ref={ref} />
      <SkillGroup
        label="Programming Languages"
        skills={["C/C++", "Java", "JavaScript", "Python"]}
        scrollRef={ref}
        index={0}
      />
      <SkillGroup
        label="Web Development"
        skills={[
          "React.js",
          "Three.js",
          "HTML/CSS",
          "Node.js",
          "Express",
          "RESTful",
        ]}
        scrollRef={ref}
        index={1}
      />
      <SkillGroup
        label="Database"
        skills={["MySQL", "MongoDB"]}
        scrollRef={ref}
        index={2}
      />
      <SkillGroup
        label="Misc"
        skills={["Android", "Unity", "Git", "Docker", "AWS"]}
        scrollRef={ref}
        index={3}
      />
    </section>
  );
}

export default Skills;
