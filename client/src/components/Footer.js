import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Footer.scss";

function Footer() {

    let currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <div className="container">&copy; {currentYear} Study Planner</div>
        </div>
    );
}

export default Footer;
