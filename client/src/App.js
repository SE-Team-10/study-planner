import React from "react";
import Dashboard from "./components/pages/Dashboard";
import GanttChart from "./components/pages/chart";
import AddNew from "./components/pages/addnew";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Helmet} from "react-helmet";
import Task from "./components/pages/task";
import Upload from "./components/pages/upload";
import "./styles/form.scss"
import Assignment from "./components/pages/Assignment/assignment";
import Module from "./components/pages/Module/module";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }


  render() {
    return (

      <>
        <Router>
          <p className="test">{this.state.apiResponse}</p>
          <Navbar />
            <div className="main-content">
              <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/chart" exact component={GanttChart} />
                  <Route path="/addnew" exact component={AddNew} />
                  <Route path="/upload" exact component={Upload} />
                  <Route path={"/assignment/:id/"}><Dashboard/><Assignment /></Route>
                  <Route path={"/module/:name/"}><Dashboard/><Module /></Route>
              </Switch>
            </div>
        </Router>
        <Footer/>
      </>
    );
  }
}

export default App;
