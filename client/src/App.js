import React from "react";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import GanttChart from "./components/pages/chart";
import AddNew from "./components/pages/addnew";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {Helmet} from "react-helmet";

class App extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
  }




  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/api");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };



  render() {
    return (

      <>
        <Helmet>
          <script src="testing.js" type="text/javascript" />
        </Helmet>
        <Router>
          <p className="test">{this.state.data}</p>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/chart" exact component={GanttChart} />
            <Route path="/addnew" exact component={AddNew} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
