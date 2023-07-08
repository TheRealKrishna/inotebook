import { React, useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import { toast } from 'react-hot-toast'


export default function AddNote() {
  const context = useContext(noteContext)
  const { addNote } = context

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note)
    setNote({ title: "", description: "", tag: "" });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleClick}>
      <div className="mb-3 my-5">
        <h4 className='my-4'>Add A Note</h4>
        <hr />
          <label htmlFor="title" className="form-label" required>Title*</label>
          <input type="text" className="form-control" value={note.title} id="title" name='title' placeholder="Enter your title" required onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description*</label>
        <textarea className="form-control" value={note.description} id="description" name='description' rows="3" placeholder="Enter your description" required onChange={onChange}></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" value={note.tag} id="tag" name='tag' placeholder="Enter your tag" onChange={onChange} />
      </div>
       <button type="submit" className="btn btn-primary">Add</button>
    </form>
  )
}
