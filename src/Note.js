import React from "react";

const Note = (props) => {
    return (
        <div className="note">
            <span onClick={props.deleteNote}>X</span>
            <textarea style={{ background: props.note.color }} value={props.note.text} onChange={props.editNote} />
        </div>
    );
};
export default Note;
