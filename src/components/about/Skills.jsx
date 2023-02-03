import { Tag } from "../lib";

const skills = [
  "C/C++",
  "Java",
  "Python",
  "Javascript",
  "Node.js",
  "React.js",
  "Three.js",
  "HTML/CSS",
  "REST",
  "MySQL",
  "MongoDB",
  "Firebase",
  "Android",
  "Unity",
  "Docker",
  "AWS",
];

function Skills({ theme }) {
  const textColor = `text-neutral-${theme === "dark" ? "200" : "900"}`;
  const titleStyle = `text-[2.4rem] ${textColor} mx-8 my-4`;
  const blockStyle = `background-blur background-blur--${theme} m-4 rounded-lg`;

  return (
    <div className={`${blockStyle} col-span-4 row-span-5`}>
      <h2 className={titleStyle}>Skills</h2>
      <div className="mx-8 flex flex-wrap gap-4">
        {skills.map((s) => (
          <Tag key={s} theme={theme} text={s} />
        ))}
      </div>
    </div>
  );
}

export default Skills;
