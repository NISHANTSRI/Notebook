import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

function AddNoteForm(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const { showAlert } = props
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert('Added Succcessfully', 'success')
        setnote({ title: '', description: '', tag: '' })
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name='title' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Content Goes Here</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Enter the tag here</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNoteForm