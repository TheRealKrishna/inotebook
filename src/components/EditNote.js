import {React, useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import { toast } from 'react-hot-toast'

export default function EditNote(props) {
    const context = useContext(noteContext)
    const {notes, editNote} = context
    const [note, setNote] = useState({_id: "", title:"", description:"", tag:""})
    if(props.id !== note._id){
        setNote(...notes.filter((note)=>note._id===props.id))
    }
    
    const handleClick = (e)=>{
      e.preventDefault()
      document.getElementById("editClose").click();
      editNote(note._id, {title:note.title, description: note.description, tag: note.tag})
      toast.success('Note Succesfully Edited');
    }
    
    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value});
    }    
    
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={handleClick}>
        <div className="modal-body">
        <label htmlFor="title" className="form-label" required>Title*</label>
        <input type="text" className="form-control" value={note.title} id="title" name='title' placeholder="Enter your title" required onChange={onChange}/>
        <div className="mb-3 mt-3">
            <label htmlFor="description" className="form-label">Description*</label>
            <textarea className="form-control" value={note.description} id="description" name='description' rows="3" placeholder="Enter your description" required onChange={onChange}></textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.tag} id="tag" name='tag' placeholder="Enter your tag" onChange={onChange}/>
        </div>  
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='editClose'>Close</button>
            <button type="submit" className="btn btn-primary" id='editSubmit'>Save changes</button>
        </div>
    </form>
        </div>
    </div>
    </div>
  )
}
