import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
import AddNoteForm from './AddNoteForm';
import Card from './Card';

function NoteCard(props) {
    const { showAlert } = props;
    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;
    const [note, setnote] = useState({ id: '', etitle: '', edescription: '', etag: '' })
    let history = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes()
        } else {
            history('/Login')
        }
        //eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ref = useRef(null)

    const closeref = useRef(null)


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        closeref.current.click()
        showAlert('Edited Successfully', 'success')

    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNoteForm showAlert={showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Content Goes Here</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Enter the tag here</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>

                {notes.map((note) => {
                    return <Card key="_id" updateNote={updateNote} note={note} showAlert={showAlert} />
                })}

            </div>
        </>
    )
}

export default NoteCard