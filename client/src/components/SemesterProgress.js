import React from "react";
import "./SemesterProgress.scss";


const SemesterProgress = (props) => {
    const { completed } = props;



  return (
    <div className="progressBar">
      <div className="fill" style={{width: `${completed}%`}}>
        <span className="label">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default SemesterProgress;
