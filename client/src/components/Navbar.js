import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link className="navbar-brand" to="/">StudyPlanner</Link>
          <ul className={"nav-menu"}>
            <li className={splitLocation[1] === "" ? "active" : ""}>
              <Link to="/">Dashboard</Link>
            </li>
            <li className={splitLocation[1] === "chart" ? "active" : ""}>
              <Link to="/chart">Gantt Chart</Link>
            </li>
            <li className={splitLocation[1] === "addnew" ? "active" : ""}>
              <Link to="/addnew">Add New</Link>
            </li>
          </ul>
          <div className="navbar-account" style={{backgroundImage: `url(/profile.png)`}}>
            <div className="account-menu">
            <ul>
                <li><Link to="#">Settings</Link></li>
                <li><Link to="#">Log out</Link></li>
            </ul>
            </div>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;
