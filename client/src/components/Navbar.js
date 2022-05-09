import React,{Component} from 'react';
import { Link, useLocation, NavLink } from "react-router-dom";
import "../styles/Navbar.scss";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.sentUser,
    };
  }

  // splitLocation = () => {
  //   const location = useLocation();
  //
  //   //destructuring pathname from location
  //   const { pathname } = location;
  //
  //   //Javascript split method to get the name of the path in array
  //   return pathname.split("/");
  // }

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-container container">

            <Link className="navbar-brand" to="/">
              <span className="material-icons md-24 close-button mobile-brand">school</span>
              <span className="desktop-brand">StudyPlanner</span>
            </Link>
            <ul className={"nav-menu"}>
              <li >
                <NavLink exact to={{pathname: "/", state: {sentUser: this.state.currentUser},}}>Dashboard</NavLink>
              </li>
              <li >
                <NavLink to={{pathname: "/chart", state: {sentUser: this.state.currentUser},}}>Gantt Chart</NavLink>
              </li>
              <li>
                <NavLink to={{pathname: "/addnew", state: {sentUser: this.state.currentUser},}}>Add New</NavLink>
              </li>
              <li>
                <NavLink to={{pathname: "/upload", state: {sentUser: this.state.currentUser},}}>Upload File</NavLink>
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
