import React, {useState} from "react";
import RadialProgress from "../../RadialProgress";

function Task({text, taskID, assignmentID, actualStart, actualEnd, progressValue, studyType}) {
    const [taskText, setTaskText] = useState(text);
    const [taskActualStart, setActualStart] = useState(actualStart)
    const [taskActualEnd, setActualEnd] = useState(actualEnd)
    const [taskStudyType, setStudyType] = useState(studyType)
    const apiLink = "/api/module-event/"+assignmentID+"/task/"+taskID;


    const saveButtonVisible = () => {
        document.getElementById("task-save"+taskID).classList.add("visible");
    }

    const changeTask = (e) => {
        setTaskText(e.currentTarget.textContent)
        saveButtonVisible()
    }

    const updateStudyType = (e) => {
        setStudyType(e.currentTarget.value)
        saveButtonVisible()
    }

    const updateStartDate = (e) => {
        setActualStart(e.currentTarget.value)
        saveButtonVisible()
    }

    const updateEndDate = (e) => {
        setActualEnd(e.currentTarget.value)
        saveButtonVisible()
    }

    const updateTask = () => {
        if (!taskText || !taskActualStart || !taskActualEnd || !taskStudyType) {
            document.getElementById("task-error"+taskID).innerHTML = "Cannot save: All fields required";
        } else {

            document.getElementById("task-save"+taskID).classList.remove("visible");

            fetch(apiLink, {
                method:'PUT',
                headers:{ 'Content-Type': 'application/json' },
                body:JSON.stringify({ id: taskID, name:taskText, actualStart:taskActualStart, actualEnd:taskActualEnd, progressValue:progressValue, studyType:taskStudyType })
            })
                .then(r => r.json())

        }

    }


    const deleteTask = () => {
        fetch(apiLink, {method:'DELETE'})
            .then(r => r.json())
    }


        return (
            <>
                <div className="note">
                    <RadialProgress percentage={parseInt(progressValue)}/>
                    <div className="note-header">
                        <span className="note-info-text">
                            Start: <input onChange={updateStartDate} className="task-date-input" required type="date" id="start" name="task-start" value={taskActualStart}/></span>
                        <span className="note-info-text">
                            End: <input onChange={updateEndDate} className="task-date-input" min={actualStart} required type="date" id="end" name="task-end" value={taskActualEnd}/>
                        </span>

                        <span className="note-info-text">
                            Type:
                            <input onChange={updateStudyType} placeholder="Enter Study Type" className="study-type-input" type="text" list="study" value={taskStudyType} />
                            <datalist id="study">
                                <option>Reading</option>
                                <option>Coding</option>
                                <option>Writing</option>
                                <option>Research</option>
                                <option>Planning</option>
                            </datalist>
                        </span>


                        <div className="note-controls">
                            <span className="material-icons md-24 control-item" onClick={deleteTask}>delete_forever</span>
                        </div>
                    </div>
                    <div spellCheck="false" data-placeholder="Click to edit task" onInput={changeTask} className="editable-text" suppressContentEditableWarning={true} contentEditable="true">{text}</div>

                    <div id={"task-save"+taskID} className="task-save">
                        <span className="task-error" id={"task-error"+taskID}></span>
                        <button onClick={updateTask}>Save</button>
                    </div>

                </div>
            </>

        );

}

export default Task;