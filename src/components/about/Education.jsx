function Education({ theme }) {
  const textColor = `text-neutral-${theme === "dark" ? "200" : "900"}`;
  const titleStyle = `text-[2.4rem] ${textColor} mx-8 my-4`;
  const blockStyle = `background-blur background-blur--${theme} m-4 rounded-lg`;

  return (
    <div className={`${blockStyle} row-span-3 col-span-6`}>
      <h2 className={titleStyle}>Education</h2>
      <div className={`mx-8 my-4 ${textColor} font-thin`}>
        <div className="my-4">
          <div className="grid grid-cols-2">
            <p className="col-span-1 uni-title">University of Melbourne</p>
            <p className="col-span-1 uni-title text-right">
              Mar. 2022 - Present
            </p>
          </div>
          <p className="degree-description">
            Master of Information Technology, Distributed System
          </p>
        </div>
        <div className="my-4">
          <div className="grid grid-cols-2">
            <p className="col-span-1 uni-title">University of Melbourne</p>
            <p className="col-span-1 uni-title text-right">
              Mar. 2019 - Dec. 2021
            </p>
          </div>
          <div className="degree-description">
            <p className="">
              Bachelor of Science, Computing and Software Systems
            </p>
            <ul className="mx-8 my-2">
              <li>Weighted Average Mark: 85.9 (First Class Honour)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
