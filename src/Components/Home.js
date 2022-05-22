import React from 'react'
import NoteCard from './NoteCard';


function Home(props) {

    return (
        <>
            <div className='container'>
                <h1 className='my-3'>Add Notes</h1>

                <NoteCard showAlert={props.showAlert} />
            </div>
        </>
    )
}

export default Home
