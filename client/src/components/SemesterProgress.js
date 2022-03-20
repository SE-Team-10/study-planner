import React from "react";
import "./SemesterProgress.scss";


const SemesterProgress = (props) => {
    const { completed } = props;


    var compWidth = parseInt(completed)

  return (
    <div className="progressBar">
      <div className="fill" style={{width: `${compWidth}%`}}>
        <span className="label">{completed}%</span>
      </div>
    </div>
  );
};

export default SemesterProgress;
