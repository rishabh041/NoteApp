import React, { PureComponent } from "react";
import Note from "./Note";

class NoteApp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            noteList: [],
            noteData: ""
        };
    }
    componentDidMount() {
        console.log("componentDidMount")
        let noteListKey = localStorage.getItem("noteListKey")
            ? localStorage.getItem("noteListKey")
            : null;
        if (noteListKey) {
            const noteList = JSON.parse(noteListKey);
            console.log("noteList", noteList);
            this.setState({
                noteList: noteList
            });
        }
    }
    addNewNoteFunc = () => {
        let newNote = window.prompt("Please make your note");
        let noteList = [...this.state.noteList];
        let ele = { text: newNote, color: "yellow" }
        if (newNote) {
            noteList.push(ele);
            this.setState({
                noteList: noteList
            });
            localStorage.setItem("noteListKey", JSON.stringify(noteList));
        } else return;
    };
    editNote = (event, index) => {
        let noteList = [...this.state.noteList];
        noteList[index].text = event.target.value;
        this.setState({
            noteList: noteList
        });
        localStorage.setItem("noteListKey", JSON.stringify(noteList));
    };
    deleteNote = (index) => {
        let noteList = [...this.state.noteList];
        noteList.splice(index, 1);
        this.setState({
            noteList: noteList
        });
        localStorage.setItem("noteListKey", JSON.stringify(noteList));
    };
    getNoteFunc = (note, index) => {
        return (
            note.display !== false && <Note
                key={`note_${index}`}
                note={note}
                index={index}
                editNote={(event) => this.editNote(event, index)}
                deleteNote={() => this.deleteNote(index)}
            />
        );
    };
    selectNoteHandler = (event) => {
        let color = event.target.value;
        let noteList = [...this.state.noteList];
        if (color === "all") {
            for (let i = 0; i < noteList.length; i++) {
                noteList[i].display = true;
            }
        }
        else {
            for (let i = 0; i < noteList.length; i++) {
                if (noteList[i].color !== color)
                    noteList[i].display = false;
                else
                    noteList[i].display = true;
            }
        }
        this.setState({
            noteList: noteList
        })
    }
    render() {
        let { noteList } = this.state;
        // console.log("noteList", noteList);
        return (
            <div className="noteApp">

                <button onClick={this.addNewNoteFunc}>New Note</button>
                <select onChange={this.selectNoteHandler}>
                    <option value="all">All</option>
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                </select>
                <div className="noteWrapper">
                    {noteList.map((note, index) => this.getNoteFunc(note, index))}
                </div>
            </div>
        );
    }
}
export default NoteApp;
