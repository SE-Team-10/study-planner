import React, {Component} from "react";

class AddNew extends Component{
  constructor() {
    super();
    this.state = {
      moduleEvents:[],
    }
  }
  componentDidMount(){
    fetch('/api/module-events')
        .then(r => r.json())
        .then(moduleEvents => this.setState({moduleEvents}))
  }

  postStudyActivity(){
      console.log(document.getElementById("tasksList").value)
    fetch('/api/study-activity/', {
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body:JSON.stringify({taskID:document.getElementById("tasksList").value, date:document.getElementById("date").value, startTime:document.getElementById("startTime").value, endTime:document.getElementById("endTime").value, taskProgressValue:document.getElementById("taskProgressValue").value})
    })
        .then(r => r.json())
  }


render()
{
  return (
      <>
        <div>
          <label>Task: </label>
          <select id="tasksList" placeholder="Select task">
            {this.state.moduleEvents.map((item) => (
                <optgroup label={item.name}>
                  {item.tasks.map((task) => (
                      <option value={task.id}>{task.name}</option>
                  ))}
                </optgroup>
            )).flat()}
          </select>
        </div>

        <div>
          <label>Date: </label>
          <input id="date" type="date"/>
        </div>


        <div>
          <label>Start Time: </label>
          <input id="startTime" type="time"/>
        </div>

        <div>
          <label>End Time: </label>
          <input id="endTime" type="time"/>
        </div>

        <div>
          <label>Progress: </label>
          <input id="taskProgressValue" type="number" min="10" max="100"/>
        </div>

        <button onClick={this.postStudyActivity}>Add Study Activity</button>
      </>
  )
}

}

export default AddNew;
