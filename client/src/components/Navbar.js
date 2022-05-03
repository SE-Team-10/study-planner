import React,{Component} from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.sentUser,
    };
    console.log("Navbar user: "+this.state.currentUser);
  }

  //static location = useLocation();

  //getLocation = () => {
    //const { pathname } = this.location;
    //const splitLocation = pathname.split("/");
    //console.log(splitLocation[1]);
    //return(splitLocation[1]);
  //}

  // className={this.getLocation() === "" ? "active" : ""}

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container container">

            <Link className="navbar-brand" to="/">StudyPlanner</Link>
            <ul className={"nav-menu"}>
              <li>
                <Link to={{pathname: "/", state: {sentUser: this.state.currentUser},}}>Dashboard</Link>
              </li>
              <li>
                <Link to={{pathname: "/chart", state: {sentUser: this.state.currentUser},}}>Gantt Chart</Link>
              </li>
              <li>
                <Link to={{pathname: "/addnew", state: {sentUser: this.state.currentUser},}}>Add New</Link>
              </li>
              <li>
                <Link to={{pathname: "/upload", state: {sentUser: this.state.currentUser},}}>Upload File</Link>
              </li>
            </ul>
            <div className="navbar-account" style={{backgroundImage: `url(/profile.png)`}}>
              <div className="account-menu">
              <p>{this.state.currentUser}</p>
              <ul>
                  <li><Link to="#">Settings</Link></li>
                  <li><Link to="#">Log out</Link></li>
              </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
  )};
}

export default Navbar;
