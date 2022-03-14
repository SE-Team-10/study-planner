import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.svg";
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
          <div className="navbar-brand">StudyPlanner</div>
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
