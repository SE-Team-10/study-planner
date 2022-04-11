import React from "react";
import "./DeadlineCard.scss";


const SubTask = (props) => {
    const { name, txcolor, actualEnd, module, type, completed, children } = props;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    var utcDate = new Date(actualEnd);

    var month = months[utcDate.getMonth()];
    var day = utcDate.getDate();


  return (
    <div className="card sub-task">
          <div className="infoBox">
              <h3 className="title">{name}</h3>
          </div>

        <div className="progressBar">
          <div className="fill" style={{width: `${completed}`}}><span className="text">{completed}</span></div>
        </div>
    </div>


    
  );
};

export default SubTask;
