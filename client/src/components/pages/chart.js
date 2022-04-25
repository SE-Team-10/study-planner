import React,{Component} from 'react';
import "../../App.css";

class GanttChart extends Component {

  componentDidMount() {
    img();
  }

  render() {
    return (
      <div className="container">
          <div className="ganttChart" id="container"/>
      </div>
    )
  }
}

export default GanttChart;
