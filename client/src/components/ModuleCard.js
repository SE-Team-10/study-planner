import React from "react";
import "../styles/DeadlineCard.scss";


const ModuleCard = (props) => {
    const { name,code} = props;



  return (
    <div className="module-card">
        <h3 className="module-name">{name}</h3>
        <span className="module-code">{code}</span>
    </div>


    
  );
};

export default ModuleCard;
