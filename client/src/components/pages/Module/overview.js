import React from "react";
import variables from "../../../styles/var.scss";
import RadialProgress from "../../RadialProgress";

function Overview({info, actualStart, actualEnd, totalNotes, totalTasks, tasksCompleted, progressValue}) {


    function dateToString(date){
        let d = new Date(date);
        let convertedDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
        return convertedDate;
    }

    return (
        <>
            <div className="overview-panel">
                <RadialProgress percentage={progressValue}/>
                <div>
                    <div>{tasksCompleted}/{totalTasks} tasks completed</div>
                    <div>{totalNotes} notes added</div>
                </div>
                <div>
                    <div>Started: {dateToString(actualStart)}</div>
                    <div>Deadline: {dateToString(actualEnd)}</div>
                </div>
            </div>

            <h2>Assignment Information</h2>
            <p>{info}</p>
        </>

    );
}

export default Overview;