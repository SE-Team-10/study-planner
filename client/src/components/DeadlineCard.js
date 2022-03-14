import React from "react";
import "./DeadlineCard.scss";


const DeadlineCard = (props) => {
    const { name, day, month, module, type, completed } = props;



  return (
    <div className="card">
        <div className="cardFlex">
          <div className="date">
              <div className="day">{day}</div>
              <div className="month">{month}</div>
          </div>
          <div className="infoBox">
              <div className="title">{name}</div>
              <div className="info">{module}</div>
              <div className="info">{type}</div>
          </div>
        </div>

        <div className="progressBar">
          <div className="fill" style={{width: `${completed}%`}}></div>
        </div>
        
    </div>

    
  );
};

export default DeadlineCard;
