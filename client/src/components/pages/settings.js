import React, {Component} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";


class Settings extends Component{
    constructor() {
        super();
        this.state = {
            darkMode: false

        }
    }

    changeBrightness = () => {
        this.setState({darkMode: !this.state.darkMode});

    }

render(){
    return (
        <div className="container">
            <h1>Settings</h1>
            <Tabs>
                <TabList className="tabs">
                    <Tab key={1}><a>Account</a></Tab>
                    <Tab key={2}><a>Appearance</a></Tab>
                </TabList>

                <div className="content">
                    <TabPanel key={1}>

                    </TabPanel>
                    <TabPanel key={2}>
                        <label className="switch">
                            <input type="checkbox" checked={this.state.darkMode} onChange={this.changeBrightness}/>
                                <span className="slider"></span>
                        </label>



                    </TabPanel>

                </div>
            </Tabs>
        </div>
    );
}
}

export default Settings;
