function Experiences({ theme }) {
  const textColor = `text-neutral-${theme === "dark" ? "200" : "900"}`;
  const titleStyle = `text-[2.4rem] ${textColor} mx-8 my-4`;
  const blockStyle = `background-blur background-blur--${theme} m-4 rounded-lg`;

  return (
    <div className={`${blockStyle} col-span-7 row-span-5`}>
      <h2 className={titleStyle}>Experience</h2>
      <div className={`mx-8 my-4 ${textColor} font-thin`}>
        <div className="my-4">
          <div className="grid grid-cols-4">
            <div className="col-span-3 ">
              <p className="job-title">ML Tax Solution</p>
              <div className="job-description">
                <p className="">Back-end Developer Intern</p>
                <ul className="mx-8 my-2">
                  <li>
                    Designed and implemented a Node.js backend connecting to a
                    MongoDB database managing the clients' information
                  </li>
                  <li>
                    Developed Python scripts to transfer existing clients' data
                    into the database
                  </li>
                </ul>
              </div>
            </div>
            <p className="job-title col-span-1 row-span-2 text-right">
              Jul. 2022 - Aug. 2022
            </p>
          </div>
        </div>
        <div className="my-4">
          <div className="grid grid-cols-4">
            <div className="col-span-3 ">
              <p className="job-title">HD Education</p>
              <div className="job-description">
                <p className="">Tutor</p>
                <ul className="mx-8 my-2">
                  <li>
                    Teaching a university computing subject, including
                    explaining foundations/key concepts of C language.
                  </li>
                  <li>
                    Detailed notes/coding examples to best guide the students.
                  </li>
                  <li>
                    Supporting students with helpful study habits and exam
                    strategies.
                  </li>
                  <li>
                    Multiple previous students achieved first class honour.
                  </li>
                </ul>
              </div>
            </div>
            <p className="job-title col-span-1 row-span-2 text-right">
              Dec. 2019 - Present
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
