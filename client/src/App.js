import React from "react";
import "./App.css";
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    // callAPI() {
    //     fetch("/api/test")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }));
    // }
    //
    // componentDidMount() {
    //     this.callAPI();
    // }

  render() {
    return (

      <>
        <Helmet>
          <script src="../public/testing.js" type="text/javascript" />
        </Helmet>
        <Router>
          <p className="test">{this.state.apiResponse}</p>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/chart" exact component={GanttChart} />
            <Route path="/addnew" exact component={AddNew} />
              <Route path="/upload" exact component={Upload} />
            <Route path={"/assignment/:id/"}><Dashboard/><Assignment /></Route>
          </Switch>
        </Router>
        <Footer/>
      </>
    );
  }
}

export default App;
