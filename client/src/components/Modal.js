import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import ReactDom from "react-dom";
import "./Modal.scss";

function Modal(props) {
    const [open, onClose] = React.useState();

    if(!open) return null;

    return ReactDom.createPortal (
        <>
            <div className="overlay"/>
            <div className="modal">
                <div className="header">
                    <h2>{props.title}</h2>
                    <span onClick={onClose} className="close material-icons md-24">close</span>
                </div>
                <div className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>

        </>,
        document.getElementById('portal')
    );
}

export default Modal;
