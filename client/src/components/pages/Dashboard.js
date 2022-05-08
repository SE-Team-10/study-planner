import React, {useState, Component} from "react";
import SemesterProgress from "../SemesterProgress";
import DeadlineCard from "../DeadlineCard";
import Modal from "../Modal";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {Helmet} from "react-helmet";
import Task from "./task";
import withData from "../withData";
import Assignment from "./Assignment/assignment";
import ModuleCard from "../ModuleCard";

//Convert function to class and add constructor to view currentUser, see upload.js for reference

//let testData = img()


//var tasks = testData;

// var tasksChildren = testData.map(value =>
//     value.children.map(child => ({ parentId: value.id, ...child }))
// ).flat();
//
// var fiveDays = Date.now() + 432000000;
//
//
// for( let x in tasks){
//     if ((tasks[x].actualEnd >= Date.now()) && (tasks[x].progressValue != "100%")){
//         upcomingDeadlines.push(tasks[x]);
//     } else if  ((tasks[x].actualEnd <= Date.now()) && (tasks[x].progressValue != "100%")){
//         pastDeadlines.push(tasks[x])
//     } else{
//         completedDeadlines.push(tasks[x])
//     }
// }
//
// for( let x in upcomingDeadlines){
//     if(upcomingDeadlines[x].actualEnd <= fiveDays){
//         upcomingDeadlines[x].color = "#ff5252";
//         console.log(upcomingDeadlines[x])
//     }
// }
//
//
// function compare( a, b ) {
//     if ( a.actualEnd < b.actualEnd ){
//         return -1;
//     }
//     if ( a.actualEnd > b.actualEnd ){
//         return 1;
//     }
//     return 0;
// }
//
// upcomingDeadlines.sort(compare);
//
// pastDeadlines.sort(compare);
// pastDeadlines.reverse();
//
// var count = 0;
// for( let x in tasks){
//     if (tasks[x].progressValue === "100%"){
//         count = count + 1;
//         console.log(tasks[x])
//     }
// }
//
// var semesterProgress = (count/tasks.length)*100;
//
// semesterProgress = Math.round(semesterProgress);

class Dashboard extends Component{
    constructor() {
        super();
        this.state = {
            moduleEvents:[],
            semesterInfo:[],
            modules:[]
        }
    }

    componentDidMount(){
        fetch('/api/module-events/upcoming')
            .then(r => r.json())
            .then(moduleEvents => this.setState({moduleEvents}))
        fetch('/api/semester-details')
            .then(r => r.json())
            .then(semesterInfo => this.setState({semesterInfo}))
        fetch('/api/modules')
            .then(r => r.json())
            .then(modules => this.setState({modules}))
    }

    filterModules(selectedFilter){
        fetch('/api/module-events/'+selectedFilter)
            .then(r => r.json())
            .then(moduleEvents => this.setState({moduleEvents}))
    }



    render(){
        return (
            <div className="container">
                <h1>{this.state.semesterInfo.semesterName} Progress</h1>
                <SemesterProgress bgcolor={"#2c57ff"} completed={this.state.semesterInfo.totalSemesterProgress}/>
                <h2>Modules</h2>
                <div className="module-cards">
                    {this.state.modules.map((module, idx) => (
                        <Link to={"/module/"+module.name}>

                            <ModuleCard key={idx} name={module.name} code={module.code}/>
                        </Link>
                    )).flat()}
                </div>

                <h2>Deadlines</h2>
                <select name="filter" id="filter" onChange={(e) =>{
                    this.filterModules(e.target.value)
                }}>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
                <div className="cardGroup">
                        {this.state.moduleEvents.map((moduleEvent, idx) => (
                            <Link to={"/assignment/"+moduleEvent.id}>

                                <DeadlineCard key={idx} name={moduleEvent.name} module={moduleEvent.moduleName} completed={moduleEvent.totalProgressValue + "%"} type={moduleEvent.type} actualEnd={moduleEvent.actualEnd}/>
                            </Link>
                        )).flat()}
                </div>

            </div>
        );
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
