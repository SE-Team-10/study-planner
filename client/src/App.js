import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./Login.css";
import Dashboard from "./components/pages/Dashboard";
import GanttChart from "./components/pages/chart";
import AddNew from "./components/pages/addnew";
import { BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Helmet} from "react-helmet";
import Upload from "./components/pages/upload";
import "./styles/form.scss"
import Assignment from "./components/pages/Assignment/assignment";
import Module from "./components/pages/Module/module";
import Settings from "./components/pages/settings";

var tempError = null;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: null,
      isSubmitted: false,
      isNew: false,
      apiResponse: "",
      currentUser: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    this.callBackendAPI()
        .then((res) => this.setState({ data: res.express }))
        .catch((err) => console.log(err));
  }

  onFileChange = event => {
    // Update the state
    this.setState({file: event.target.files[0]})
  };

  onFileUpload = async () => {
    //Object to store and pass file data
    const fileEdit = new File([this.state.file], this.state.currentUser+'.json')
    const formData = new FormData();
    formData.append("file", fileEdit);
    formData.append("fileName", this.state.currentUser);
    // Details of the uploaded file
    console.log(formData);
    // Send formData object
    axios.post('http://localhost:5000/api-upload', formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      }
    })
    .then((res) => {
        console.log(res.data);
      })
    .then(this.setState({isNew: false}));
    await fetch('http://localhost:5000/forceUpdate');
    let history = useHistory();
    history.push('/');
    this.forceUpdate();
  };
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/api");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { semester, uname, pass } = document.forms[0];
    let userLog = JSON.stringify({semester: semester.value, name: uname.value, password: pass.value});
    console.log(userLog);
    const result = await fetch('http://localhost:5000/checkUser', {method: "POST", headers: {"Content-Type": "application/json"}, body:userLog})
    const returnMessage = await result.json();
    if(returnMessage.code == 200){
      this.setState({currentUser: returnMessage.name});
      this.setState({isNew: returnMessage.new});
      this.setState({isSubmitted: true});
    }else{
      console.log(returnMessage);
      tempError = {name: returnMessage.name, message: returnMessage.message};
    };
    await fetch('http://localhost:5000/forceUpdate');
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

  home = (user) => {
    console.log("currentUser: "+user);
    return (

      <div className="content">
        <div style={{display: this.state.isNew ? 'block' : 'none' }} className="overlay-pop">
          <div className="logbox">
            <p className="brand">Study Planner</p>
            <div className="form">
              <h2>Looks like you're a new user!</h2>
              <p>Please upload the file provided to you by the HUB to use this website.</p>
              <form onSubmit={this.handleSubmit}>
                <div className="input-container">
                  <input type="file" onChange={this.onFileChange} accept=".json"/>
                  <button onClick={this.onFileUpload}>Upload!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Router>
          <p className="test">{this.state.apiResponse}</p>
          <Navbar sentUser = {user}/>
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
      </div>
    )};

  render() {
    return (
        <body>
        {this.state.isSubmitted ? this.home(this.state.currentUser) : this.renderForm()}
        </body>
    );}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
