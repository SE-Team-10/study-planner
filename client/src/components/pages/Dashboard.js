import React, {useState} from "react";
import "../../App.css";
import SemesterProgress from "../SemesterProgress";
import DeadlineCard from "../DeadlineCard";
import Modal from "../Modal";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {Helmet} from "react-helmet";
import Task from "./task";

//Convert function to class and add constructor to view currentUser, see upload.js for reference

let testData = img()


var tasks = testData;

// var tasksChildren = testData.map(value =>
//     value.children.map(child => ({ parentId: value.id, ...child }))
// ).flat();
//
// var tasks = tasks.concat(tasksChildren);


for(let x in tasks){
    const taskChildren = tasks[x].children;
    tasks[x].progressValue = 0;
    for(let i in taskChildren){
        tasks[x].progressValue += parseInt(taskChildren[i].progressValue);
    }
    tasks[x].progressValue = tasks[x].progressValue/taskChildren.length;
    tasks[x].progressValue += "%";
}




var upcomingDeadlines=[];
var pastDeadlines=[];
var completedDeadlines=[];

var fiveDays = Date.now() + 432000000;


for( let x in tasks){
    if ((tasks[x].actualEnd >= Date.now()) && (tasks[x].progressValue != "100%")){
        upcomingDeadlines.push(tasks[x]);
    } else if  ((tasks[x].actualEnd <= Date.now()) && (tasks[x].progressValue != "100%")){
        pastDeadlines.push(tasks[x])
    } else{
        completedDeadlines.push(tasks[x])
    }
}

for( let x in upcomingDeadlines){
    if(upcomingDeadlines[x].actualEnd <= fiveDays){
        upcomingDeadlines[x].color = "#ff5252";
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
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container">
      <h2>Semester Progress</h2>
      <SemesterProgress bgcolor={"#2c57ff"} completed={semesterProgress}/>
      <h2>Upcoming Deadlines</h2>
      <div className="cardGroup">
          <Router>
              {upcomingDeadlines.map((item, idx) => (
                  <>
                      <Link to={"/task/"+item.id+"/"+item.name}>
                      <div>
                          <DeadlineCard key={idx} txcolor={item.color} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
                      </div>
                      </Link>
                  </>
              )).flat()}
              <Route path={"/task/:id/:name"}><Task /></Route>
          </Router>

      </div>

        <h2>Past Deadlines</h2>
        <div className="cardGroup">
            {pastDeadlines.map((item, idx) => (
                <DeadlineCard key={idx} txcolor={item.color} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
            )).flat()}
        </div>

        <h2>Completed Deadlines</h2>
        <div className="cardGroup">
            {completedDeadlines.map((item, idx) => (
                <DeadlineCard key={idx} txcolor={item.color} name={item.name} completed={item.progressValue} module={item.module} type={item.type} actualEnd={item.actualEnd}/>
            )).flat()}
        </div>




    </div>
  );
}

export default Dashboard;
