import { useTheme } from "../../contexts/themeContext";
import { DetailBlock } from "../lib";

function Education() {
  const [theme] = useTheme();
  return (
    <div
      className={`max-width-container vertical-center mx-auto my-32 sm:my-64 education-section text--${theme}`}
    >
      <h2 className="section-title">Education</h2>
      <DetailBlock
        title="University of Melbourne"
        startDate="Mar. 2022"
        endDate="Present"
        description="Master of Information Technology, Distributed System"
      />
      <DetailBlock
        title="University of Melbourne"
        startDate="Mar. 2019"
        endDate="Dec. 2021"
        description="Bachelor of Science, Computing and Software Systems"
        remark={["Weighted Average Mark: 85.9 (First Class Honour)"]}
      />
    </div>
  );
}

export default Education;
