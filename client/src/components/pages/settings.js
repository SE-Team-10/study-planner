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
        if(this.state.darkMode){
            document.documentElement.style.setProperty('--bg1', '#fff');
            document.documentElement.style.setProperty('--bg2', '#f8f8f8');
            document.documentElement.style.setProperty('--bg3', '#e7e7e7');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--text-color-2', '#aaa');
            document.documentElement.style.setProperty('--border', '#e7e7e7');
        } else{
            document.documentElement.style.setProperty('--bg1', '#1f1f1f');
            document.documentElement.style.setProperty('--bg2', '#181818');
            document.documentElement.style.setProperty('--bg3', '#101010');
            document.documentElement.style.setProperty('--text-color', '#f3f3f3');
            document.documentElement.style.setProperty('--text-color-2', '#aaa');
            document.documentElement.style.setProperty('--border', '#2c2c2c');
        }
    }

    setColor1 = () =>{
        document.documentElement.style.setProperty('--theme-primary', 'rgb(0,122,255)');
        document.documentElement.style.setProperty('--theme-secondary', 'rgb(88,86,214)');
    }

    setColor2 = () =>{
        document.documentElement.style.setProperty('--theme-primary', 'rgb(255,45,85)');
        document.documentElement.style.setProperty('--theme-secondary', 'rgb(175,82,222)');
    }

    setColor3 = () =>{
        document.documentElement.style.setProperty('--theme-primary', 'rgb(255,149,0)');
        document.documentElement.style.setProperty('--theme-secondary', 'rgb(255,204,0)');
    }

    setColor4 = () =>{
        document.documentElement.style.setProperty('--theme-primary', 'rgb(52,199,89)');
        document.documentElement.style.setProperty('--theme-secondary', 'rgb(0,199,190)');
    }

render(){
    return (
        <div className="container">
            <h1>Settings</h1>
            <Tabs>
                <TabList className="tabs tabs-full-page">
                    <Tab key={1}><a>Appearance</a></Tab>

                </TabList>

                <div className="content">

                    <TabPanel key={1}>
                        <p>
                            <label>Dark Mode</label>
                            <input type="checkbox" checked={this.state.darkMode} onChange={this.changeBrightness}/>
                        </p>

                        <p><strong>Change Theme</strong></p>
                        <div onClick={this.setColor1} className="color-option color-1"></div>
                        <div onClick={this.setColor2} className="color-option color-2"></div>
                        <div onClick={this.setColor3} className="color-option color-3"></div>
                        <div onClick={this.setColor4} className="color-option color-4"></div>
                    </TabPanel>

                </div>
            </Tabs>
        </div>
    );
}
}

export default Settings;
