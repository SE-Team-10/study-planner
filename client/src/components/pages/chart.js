import React from "react";
import "../../App.css";

function GanttChart() {

    const ganttHTML = '<button onclick="img()">Click me!</button>\n' + '<div id = "container"></div>'

  return (

      <div className="container">
          <button onClick={img}>Click me!</button>
          <div onLoad={img} className={"ganttChart"} id={"container"}/>
      </div>


  );
}

export default GanttChart;
