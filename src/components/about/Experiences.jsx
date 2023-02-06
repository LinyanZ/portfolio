import { useTheme } from "../../contexts/themeContext";
import { DetailBlock } from "../lib";

function Experiences() {
  const [theme] = useTheme();

  return (
    <div
      className={`max-width-container vertical-center mx-auto my-32 sm:my-64 experience-section text--${theme}`}
    >
      <h2 className="section-title">Experience</h2>
      <DetailBlock
        title="ML Tax Solution"
        startDate="Jul. 2022"
        endDate="Aug. 2022"
        description="Back-end Developer Intern"
        remark={[
          "Designed and implemented a Node.js backend connecting to a MongoDB database managing the clients' information",
          "Developed Python scripts to transfer existing clients' data into the database",
        ]}
      />
      <DetailBlock
        title="HD Education"
        startDate="Dec. 2019"
        endDate="Present"
        description="Tutor"
        remark={[
          "Teaching a university computing subject, including explaining foundations/key concepts of C language.",
          "Detailed notes/coding examples to best guide the students.",
          "Supporting students with helpful study habits and exam strategies.",
          "Multiple previous students achieved first class honour.",
        ]}
      />
    </div>
  );
}

export default Experiences;
