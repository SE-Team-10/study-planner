import React, {useState} from "react";

function Note({text, noteID, assignmentID, dateCreated}) {
    const [noteText, setNoteText] = useState(text);
    const apiLink = "/api/module-event/"+assignmentID+"/note/"+noteID;

    const changeNote = (e) => {
        setNoteText(e.currentTarget.textContent)
    }

    const updateNote = () => {

        fetch(apiLink, {
            method:'PUT',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({ id: noteID, text:noteText, dateCreated:dateCreated })
        })
            .then(r => r.json())

    }


    const deleteNote = () => {
        fetch(apiLink, {method:'DELETE'})
            .then(r => r.json())
    }


        return (
            <>
                <div className="note">
                    <div className="note-header">
                        <span className="note-info-text">Created: {new Date(dateCreated).toUTCString()}</span>
                        <div className="note-controls">
                            <span className="material-icons md-24 control-item" onClick={deleteNote}>delete_forever</span>
                        </div>
                    </div>
                    <div spellCheck="false" data-placeholder="Click to edit note" onInput={changeNote} onBlur={updateNote} className="editable-text" suppressContentEditableWarning={true} contentEditable="true">{text}</div>
                </div>
            </>

        );

}

export default Note;