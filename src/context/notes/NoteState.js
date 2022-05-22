import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setnotes] = useState(notesInitial)


    const getAllNotes = async () => {
        // API call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json)
        setnotes(json)
    }




    // add note
    const addNote = async (title, description, tag) => {
        // API call

        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()

        console.log(json)
        const note = json;
        setnotes(notes.concat(note))
        props.showAlert('Note Added Successfully', 'success')
    }
    // delete note
    const deleteNote = async (id) => {
        console.log("deleting" + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes)

        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json)
        //props.showAlert('Note Deleted', 'success')
    }
    //edit note
    const editNote = async (id, title, description, tag) => {

        // API call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        console.log(json)


        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setnotes(newNotes)
        props.showAlert('Note Edited', 'success')
    }

    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState;