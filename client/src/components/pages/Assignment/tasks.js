import React, {useState} from "react";
import "../../../styles/note.scss"
import Task from "./Task";

const Tasks = ({assignmentID}) => {
    const apiLink = "/api/module-event/"+assignmentID;
    const [tasksArray, setTasksArray] = useState([]);

    fetch(apiLink)
        .then(r => r.json())
        .then(r =>
            setTasksArray(r.tasks)
        )


    const addTask = () => {
        fetch(apiLink+'/task', {method:'POST'})
            .then(r => r.json())
    }

    const convertDate = (orgDate) => {
        if (orgDate===""){
            return orgDate
        }else{
            return new Date(orgDate).toISOString().split('T')[0];
        }
    }



    return (
        <>
            <button onClick={addTask}><span className="material-icons">add</span> Task</button>


            {tasksArray.reverse().map((task) => (
                <Task key={task.id} text={task.name} taskID={task.id} assignmentID={assignmentID} actualStart={convertDate(task.actualStart)} actualEnd={convertDate(task.actualEnd)} type={task.type} progressValue={task.progressValue} studyType={task.studyType}/>
            ))}
        </>

    );
}

export default Tasks;