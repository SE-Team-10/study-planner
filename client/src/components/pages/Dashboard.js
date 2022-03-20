import React from "react";
import "../../App.css";
import SemesterProgress from "../SemesterProgress";
import DeadlineCard from "../DeadlineCard";
import {Helmet} from "react-helmet";



const testData = img();

var tasks = testData;

var tasksChildren = testData.map(value =>
    value.children.map(child => ({ parentId: value.id, ...child }))
).flat();

var tasks = tasks.concat(tasksChildren);

var upcomingDeadlines=[];
var pastDeadlines=[];

var fiveDays = Date.now() + 432000000;



for( let x in tasks){
    if (tasks[x].actualEnd >= Date.now()){
        upcomingDeadlines.push(tasks[x]);
    } else{
        pastDeadlines.push(tasks[x])
    }
}

for( let x in upcomingDeadlines){
    if(upcomingDeadlines[x].actualEnd <= fiveDays){
        upcomingDeadlines[x].color = "#ff0000";
        console.log(upcomingDeadlines[x])
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

var count = 0;
for( let x in tasks){
    if (tasks[x].progressValue === "100%"){
        count = count + 1;
        console.log(tasks[x])
    }
}

var semesterProgress = (count/tasks.length)*100;

semesterProgress = Math.round(semesterProgress);


function Dashboard() {
  return (
    <div className="container">
      <h2>Semester Progress</h2>
      <SemesterProgress bgcolor={"#2c57ff"} completed={semesterProgress}/>
      <h2>Upcoming Deadlines</h2>
      <div className="cardGroup">
      {upcomingDeadlines.map((item, idx) => (
        <DeadlineCard key={idx} txcolor={item.color} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
      )).flat()}
      </div>

        <h2>Past Deadlines</h2>
        <div className="cardGroup">
            {pastDeadlines.map((item, idx) => (
                <DeadlineCard key={idx} txcolor={item.color} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
            )).flat()}
        </div>
      
    </div>
  );
}

export default Dashboard;
