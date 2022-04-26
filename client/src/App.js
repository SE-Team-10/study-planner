import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./Login.css";
import Dashboard from "./components/pages/Dashboard";
import GanttChart from "./components/pages/chart";
import AddNew from "./components/pages/addnew";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Helmet} from "react-helmet";
import Task from "./components/pages/task";
import Upload from "./components/pages/upload";

var currentUser = null;

const database = [
  {
    "userName": "Bob",
    "PassWord": "1",
    "Semester": "Semester 1"
  },
  {
    "userName": "Tom",
    "PassWord": "2",
    "Semester": "Semester 2"
  },
  {
    "userName": "Amy",
    "PassWord": "3",
    "Semester": "Semester 3"
  }
];

const errors = {
  semester: "Incorrect Semester",
  uname: "Invalid Username",
  pass: "Invalid Password"
};

var tempError = null;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isSubmitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { semester, uname, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.userName === uname.value);
    // Compare user info
    if (userData) {
      if(userData.PassWord !== pass.value){
        tempError = {name: "pass", message: errors.pass};
      } else if (userData.Semester !== semester.value) {
        tempError = {name: "semester", message: errors.semester};
      } else {
        currentUser = userData.userName;
        this.setState({isSubmitted: true})
      }
    } else {
      // Username not found
      tempError = {name: "uname", message: errors.uname};
    }
    console.log(tempError.message);
    this.forceUpdate();
  };

  renderErrorMessage = (name) => {
    if (tempError && name === tempError.name){
      return(<div className="error">{tempError.message}</div>);
    } else {
      return(<div className="hide">secret</div>);
    }
  };

  renderForm = () => {
    return (
        <div className="bg">
          <div className="logbox">
            <p className="brand">Study Planner</p>
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                <div className="input-container">
                  <label>Semester </label>
                  <select type="text" name="semester" required>
                    <option> Select your Semester: </option>
                    <option> Semester 1</option>
                    <option> Semester 2</option>
                    <option> Semester 3</option>
                    <option> Semester 4</option>
                  </select>
                  {this.renderErrorMessage("semester")}
                </div>
                <div className="input-container">
                  <label>Username </label>
                  <input type="text" name="uname" required />
                  {this.renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" name="pass" required />
                  {this.renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                  <input type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
  )};

  home = () => {
    return (
      <>
        <Helmet>
          <script src="../public/testing.js" type="text/javascript" />
        </Helmet>
        <Router>
          <p className="test">{this.state.data}</p>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/chart" exact component={GanttChart} />
            <Route path="/addnew" exact component={AddNew} />
            <Route path="/upload" exact component={Upload} />
            <Route path={"/task/:id/:name"}><Task /></Route>
          </Switch>
        </Router>
        <Footer/>
      </>
  )};

  render() {
    return (
      <body>
        {this.state.isSubmitted ? this.home() : this.renderForm()}
      </body>
  );}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
