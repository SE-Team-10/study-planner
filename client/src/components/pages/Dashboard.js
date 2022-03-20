import React from "react";
import "../../App.css";
import SemesterProgress from "../SemesterProgress";
import DeadlineCard from "../DeadlineCard";

const testData = img();

var tasks = testData;

var tasksChildren = testData.map(value =>
    value.children.map(child => ({ parentId: value.id, ...child }))
).flat();

var tasks = tasks.concat(tasksChildren);

var upcomingDeadlines=[];
var pastDeadlines=[];



for( let x in tasks){
    if (tasks[x].actualEnd >= Date.now()){
        upcomingDeadlines.push(tasks[x]);
    } else{
        pastDeadlines.push(tasks[x])
    }
}

function compare( a, b ) {
    if ( a.actualEnd < b.actualEnd ){
        return -1;
    }
    if ( a.actualEnd > b.actualEnd ){
        return 1;
    }
    return 0;
}

upcomingDeadlines.sort(compare);

pastDeadlines.sort(compare);
pastDeadlines.reverse();


function Dashboard() {
  return (
    <div className="container">
      <h2>Semester Progress</h2>
      <SemesterProgress bgcolor={"#2c57ff"} completed={69}/>
      <h2>Upcoming Deadlines</h2>
      <div className="cardGroup">
      {upcomingDeadlines.map((item, idx) => (
        <DeadlineCard key={idx} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
      )).flat()}
      </div>

        <h2>Past Deadlines</h2>
        <div className="cardGroup">
            {pastDeadlines.map((item, idx) => (
                <DeadlineCard key={idx} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
            )).flat()}
        </div>
      
    </div>
  );
}

export default Dashboard;
