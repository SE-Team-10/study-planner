import React, {useState, Component} from "react";
import SemesterProgress from "../SemesterProgress";
import DeadlineCard from "../DeadlineCard";
import { Link } from "react-router-dom";
import ModuleCard from "../ModuleCard";

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

                <div className="dashboard-item">
                    <h2>Modules</h2>
                    <div className="module-cards">
                        {this.state.modules.map((module, idx) => (
                            <Link to={"/module/"+module.name}>

                                <ModuleCard key={idx} name={module.name} code={module.code}/>
                            </Link>
                        )).flat()}
                    </div>
                </div>

                <div className="dashboard-item">
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

            </div>
        );
    }

}

export default Dashboard;
