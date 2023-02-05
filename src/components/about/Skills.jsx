import { useTheme } from "../../contexts/themeContext";
import { useRef } from "react";

function SkillGroup({ label, skills }) {
  const [theme] = useTheme();
  return (
    <div className="skill-group-container">
      <h3 className={`skill-group__label text--${theme}`}>{label}</h3>
      <ul className="skills-container">
        {skills.map((s) => (
          <li key={s} className={`skill text--${theme}`}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills({}) {
  const [theme] = useTheme();

  return (
    <section className={`skill-section`}>
      <h2 className={`skill-section-title text--${theme}`}>Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <SkillGroup
          label="Programming Languages"
          skills={["C/C++", "Java", "JavaScript", "Python"]}
        />
        <SkillGroup
          label="Web Development"
          skills={["React.js", "Three.js", "Node.js", "HTML/CSS", "RESTful"]}
        />
        <SkillGroup label="Database" skills={["MySQL", "MongoDB"]} />
        <SkillGroup
          label="Misc"
          skills={["Android", "Unity", "Git", "Docker", "AWS"]}
        />
      </div>
    </section>
  );
}

export default Skills;
