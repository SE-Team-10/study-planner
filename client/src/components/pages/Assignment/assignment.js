import React, {useState, Component} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {Link, BrowserRouter, Switch, Route, useLocation, withRouter, NavLink} from "react-router-dom";
import "../../../styles/Modal.scss"
import ReactDom from "react-dom";
import RadialProgress from "../../RadialProgress";
import Overview from "./overview";
import Note from "./note";
import DeadlineCard from "../../DeadlineCard";
import Notes from "./Notes";
import Tasks from "./tasks";


class Assignment extends Component {
    constructor() {
        const parser = new DOMParser();
        super();
        this.state = {
            assignment: "",
            isLoading: true,
            notesArr:[]
        };
    }

    getAssignment(){
        const apiLink = "/api/module-event/"+this.props.match.params.id;

        function calcTotalTasks(assignment) {

        }


        fetch(apiLink)
            .then(r => r.json())
            .then(assignment =>
                this.setState({
                    assignment:assignment,
                    isLoading:false,
                    notesArr:assignment.notes,
                })
            )
    }

    componentDidMount(){
        this.getAssignment();
        document.body.classList.add("active-modal");

    }

    componentWillUnmount() {
        document.body.classList.remove("active-modal");
    }

    getTasks(){
        let assignmentTasks = [];
        assignmentTasks = this.state.assignment;
        return assignmentTasks;
    }

    render(){
        return  ReactDom.createPortal(
            <>
                <div className="overlay">
                    <div className="modal">
                        <div className="header">
                            <div className="upper">
                                <Link to="/" className="close">
                                    <span className="close-text">Close</span>
                                    <span className="material-icons md-24 close-button">close</span>
                                </Link>
                                <ol className="breadcrumbs">
                                    <li><Link to={"/module/"+this.state.assignment.moduleName}>{this.state.assignment.moduleName}</Link></li>
                                    <li><Link to="/">{this.state.assignment.name}</Link></li>
                                </ol>
                            </div>
                            <h1>{this.state.assignment.name}</h1>

                        </div>

                            <Tabs>
                                    <TabList className="tabs">
                                        <Tab key={1}><a>Overview</a></Tab>
                                        <Tab key={2}><a>Notes</a></Tab>
                                        <Tab key={3}><a>Tasks</a></Tab>
                                    </TabList>

                                <div className="content">
                                <TabPanel key={1}><Overview info={this.state.assignment.moduleEventOverview} actualStart={this.state.assignment.actualStart} actualEnd={this.state.assignment.actualEnd} tasksCompleted={this.state.assignment.tasksCompleted} totalTasks={this.state.assignment.totalTasks} totalNotes={this.state.assignment.totalNotes} progressValue={parseInt(this.state.assignment.totalProgressValue)}/></TabPanel>
                                <TabPanel key={2}>
                                    <Notes assignmentID={this.state.assignment.id}/>


                                </TabPanel>
                                <TabPanel key={3}>
                                    <Tasks assignmentID={this.state.assignment.id}/>
                                </TabPanel>
                                </div>
                            </Tabs>
                    </div>
                </div>


            </>,
            document.getElementById('portal')
        );
    }

}





export default withRouter(Assignment);
