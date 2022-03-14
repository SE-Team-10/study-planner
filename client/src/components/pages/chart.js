import React from "react";
import "../../App.css";

function GanttChart() {
  return (
    <div>
      <h1>Gantt Chart</h1>
      <div>
        <ul>
          <li>Coffee</li>
          <li>
            Tea
            <ul>
              <li>Black tea</li>
              <li>Green tea</li>
            </ul>
          </li>
          <li>Milk</li>
        </ul>
      </div>
    </div>
  );
}

export default GanttChart;
