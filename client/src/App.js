import React from "react";
import "./App.css";
import Dashbaord from "./components/pages/Dashboard";
import GanttChart from "./components/pages/chart";
import AddNew from "./components/pages/addnew";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

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
        <Router>
          <Navbar />
          <p className="checkExpress">{this.state.data}</p>
          <Switch>
            <Route path="/" exact component={Dashbaord} />
            <Route path="/chart" exact component={GanttChart} />
            <Route path="/addnew" exact component={AddNew} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
