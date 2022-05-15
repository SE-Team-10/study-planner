import React, {Component} from "react";

class FullList extends Component{
  constructor() {
    super();
    this.state = {
      studyActivities:[],
    }
  }
  componentDidMount(){
    fetch('/api/study-activity')
        .then(r => r.json())
        .then(studyActivities => this.setState({studyActivities}))
  }


render()
{
  return (
      <>
        <table className="study-activity-table">
            <tr>
            <th>Study Activity ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Task ID</th>
            <th>Task Progress</th>
            </tr>


                {this.state.studyActivities.map((activity) => (
                    <tr>
                    <td>{activity.id}</td>
                    <td>{activity.date}</td>
                    <td>{activity.startTime}</td>
                    <td>{activity.endTime}</td>
                    <td>{activity.taskID}</td>
                    <td>{activity.taskProgressValue}</td>
                    </tr>

                ))}
        </table>
      </>
  )
}

}

export default FullList;
