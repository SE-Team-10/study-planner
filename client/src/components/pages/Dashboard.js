import React from "react";
import "../../App.css";
import SemesterProgress from "../SemesterProgress";
import DeadlineCard from "../DeadlineCard";

const testData = [
  { name: "Software Engineering Project", completed: 60, module:"Software Engineering", type:"Group Coursework", day:14, month:"Mar" },
  { name: "The title of this is really long for some reason or something. It might need more than one line.", completed: 31, module:"Programming", type:"Online Exam", day:19, month:"Mar" },
  { name: "VOIP Project", completed: 90, module:"Networks", type:"Group Coursework", day:2, month:"Apr" },
];

function Dashboard() {
  return (
    <div className="container">
      <h2>Semester Progress</h2>
      <SemesterProgress bgcolor={"#2c57ff"} completed={69}/>
      <h2>Upcoming Deadlines</h2>

      <div className="cardGroup">
      {testData.map((item, idx) => (
        <DeadlineCard key={idx} name={item.name} completed={item.completed} module={item.module} type={item.type} day={item.day} month={item.month}  />
      ))}
      </div>
      
    </div>
  );
}

export default Dashboard;
