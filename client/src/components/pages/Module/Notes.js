import React, {useState} from "react";
import "../../../styles/note.scss"
import Note from "./note";

function Notes({assignmentID}) {
    const apiLink = "/api/module-event/"+assignmentID;
    const [notesArray, setNotesArray] = useState([]);


        fetch(apiLink)
            .then(r => r.json())
            .then(r =>
                setNotesArray(r.notes)
            )


    const addNote = () => {
        fetch(apiLink+'/note', {method:'POST'})
            .then(r => r.json())
    }



    return (
        <>
            <button onClick={addNote}><span className="material-icons">add</span> Note</button>
        {notesArray.reverse().map((note, idx) => (
                <Note key={idx} text={note.text} noteID={note.id} assignmentID={assignmentID} dateCreated={note.dateCreated}/>
            ))}
        </>

    );
}

export default Notes;