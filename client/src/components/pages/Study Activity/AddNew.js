import React, {Component} from "react";
import "../../../styles/StudyActivity.scss";

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
      if(!document.getElementById("tasksList").value){
          document.getElementById("tasksList").style.border=('1px solid red');
          document.getElementById("add-new-form-error").innerHTML = "All fields required";
      } else if(!document.getElementById("date").value){
          document.getElementById("date").style.border=('1px solid red');
          document.getElementById("add-new-form-error").innerHTML = "All fields required";
      } else if(!document.getElementById("startTime").value){
          document.getElementById("startTime").style.border=('1px solid red');
          document.getElementById("add-new-form-error").innerHTML = "All fields required";
      } else if(!document.getElementById("endTime").value){
          document.getElementById("endTime").style.border=('1px solid red');
          document.getElementById("add-new-form-error").innerHTML = "All fields required";
      } else if(!document.getElementById("taskProgressValue").value){
          document.getElementById("taskProgressValue").style.border=('1px solid red');
          document.getElementById("add-new-form-error").innerHTML = "All fields required";
      } else if(document.getElementById("taskProgressValue").value > 100) {
          document.getElementById("taskProgressValue").style.border = ('1px solid red');
          document.getElementById("add-new-form-error").innerHTML = "Progress cannot be greater than 100";
      } else{
          fetch('/api/study-activity/', {
              method:'POST',
              headers:{ 'Content-Type': 'application/json' },
              body:JSON.stringify({taskID:document.getElementById("tasksList").value, date:document.getElementById("date").value, startTime:document.getElementById("startTime").value, endTime:document.getElementById("endTime").value, taskProgressValue:document.getElementById("taskProgressValue").value})
          })
              .then(r => r.json())
          alert("Study activity updated successfully");

      }

  }


render()
{
  return (
      <div className="add-new-form">
        <div>
          <label>Task: </label>
          <select required id="tasksList">
              <option value="" disabled selected>Select task</option>
            {this.state.moduleEvents.map((item) => (
                <optgroup label={item.name}>
                  {item.tasks.map((task) => (
                      <option key={task.id} value={task.id}>{task.name}</option>
                  ))}
                </optgroup>
            )).flat()}
          </select>
        </div>

        <div>
          <label>Date: </label>
          <input required id="date" type="date"/>
        </div>


        <div>
          <label>Start Time: </label>
          <input required id="startTime" type="time"/>
        </div>

        <div>
          <label>End Time: </label>
          <input required id="endTime" type="time"/>
        </div>

        <div>
          <label>Progress: </label>
          <input required id="taskProgressValue" type="number" pattern="[1-100]"/>
        </div>

          <div id="add-new-form-error"></div>

        <button onClick={this.postStudyActivity}>Add Study Activity</button>
      </div>
  )
}

}

export default AddNew;
