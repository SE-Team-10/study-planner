import React,{useState, Component} from 'react';
import Helmet from "react-helmet";

class GanttChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ganttData:"",
    }
  };

    img = (data) => {
        // create a data tree
        var treeData = anychart.data.tree(data, "as-tree");

        // create a chart
        var chart = anychart.ganttProject();

        // set the data
        chart.data(treeData);
        // configure the scale
        chart.getTimeline().scale().maximum(Date.UTC(2022, 6, 30));
        // set the container id
        chart.container("container");
        // initiate drawing the chart
        chart.draw();
        // fit elements to the width of the timeline
        chart.fitAll();

        return data;
    }


    componentDidMount() {
    fetch('/api/gantt')
        .then(r => r.json())
        .then(ganttData => this.setState({ganttData}, () => this.img(ganttData)))
  }


  render() {
    return (
        <>
          {/*<Helmet>*/}
          {/*  <script src="https://cdn.anychart.com/releases/8.6.0/js/anychart-core.min.js"></script>*/}
          {/*  <script src="https://cdn.anychart.com/releases/8.6.0/js/anychart-gantt.min.js"></script>*/}
          {/*</Helmet>*/}
        <div className="container">
            <div className="ganttChart" id="container"/>
        </div>
        </>
    )
  }
}

export default GanttChart;
