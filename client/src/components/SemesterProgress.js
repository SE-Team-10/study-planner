import React from "react";
import "../styles/SemesterProgress.scss";


const SemesterProgress = (props) => {
    const { completed } = props;


    var compWidth = parseInt(completed)

    if (compWidth <= 95){
        document.getElementById("percentLabel").style.marginLeft = "100%";
        document.getElementById("percentLabel").style.color="var(--theme-primary)"
    }

  return (
    <div className="progressBar">
      <div className="fill" style={{width: `${compWidth}%`}}>
        <span id="percentLabel" className="label">{completed}%</span>
      </div>
    </div>
  );
};

export default SemesterProgress;
