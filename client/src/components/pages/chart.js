import React,{Component} from 'react';
import "../../App.css";

class GanttChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      currentUser: props.location.state.sentUser,
    };
    console.log("Chart User: "+this.state.currentUser);
  };

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
