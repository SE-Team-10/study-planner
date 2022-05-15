import React, {useState, Component} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {Link, withRouter } from "react-router-dom";
import "../../../styles/Modal.scss"
import ReactDom from "react-dom";
import DeadlineCard from "../../DeadlineCard";


class Module extends Component {
    constructor() {
        const parser = new DOMParser();
        super();
        this.state = {
            module: "",
            isLoading: true,
            moduleEvents:[]
        };
    }

    getAssignments(){
        fetch('/api/module-events/module='+this.props.match.params.name)
            .then(r => r.json())
            .then(moduleEvents => this.setState({moduleEvents}))
    }

    getModule(){
        const apiLink = "/api/module/"+this.props.match.params.name;

        fetch(apiLink)
            .then(r => r.json())
            .then(module =>
                this.setState({
                    module:module,
                })
            )
    }

    componentDidMount(){
        this.getModule();
        this.getAssignments()
        document.body.classList.add("active-modal");

    }

    componentWillUnmount() {
        document.body.classList.remove("active-modal");
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

                            </div>
                            <h1>{this.state.module.name}</h1>

                        </div>

                            <Tabs>
                                    <TabList className="tabs">
                                        <Tab key={1}><a>Assignments</a></Tab>
                                        <Tab key={2}><a>Info</a></Tab>
                                    </TabList>

                                <div className="content">
                                <TabPanel key={1}>
                                    <div className="cardList">
                                        {this.state.moduleEvents.map((moduleEvent) => (
                                            <div key={moduleEvent.id}>
                                            <Link to={"/assignment/"+moduleEvent.id}>
                                                <DeadlineCard name={moduleEvent.name} module={moduleEvent.moduleName} completed={moduleEvent.totalProgressValue + "%"} type={moduleEvent.type} actualEnd={moduleEvent.actualEnd}/>
                                            </Link>
                                            </div>
                                        )).flat()}
                                    </div>
                                </TabPanel>
                                <TabPanel key={2}>
                                    {this.state.module.moduleOverview}
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





export default withRouter(Module);
