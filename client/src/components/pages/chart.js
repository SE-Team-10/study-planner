import React,{useState, Component} from 'react';
import "../../App.css";

class GanttChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ganttData:"",
    }
  }

  componentDidMount() {
    fetch('/api/gantt')
        .then(r => r.json())
        .then(ganttData => this.setState({ganttData}, () => img(ganttData)))
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
