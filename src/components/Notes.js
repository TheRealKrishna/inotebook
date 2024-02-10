/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState} from 'react'
import noteContext from '../context/notes/NoteContext'
import EditNote from './EditNote'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

export default function Notes() {
const context = useContext(noteContext)
const {notes, fetchNotes, deleteNote} = context
const [loader, setLoader] = useState(true);
const navigate = useNavigate();
useEffect(()=>{
  if(localStorage.getItem("auth-token")){
    new Promise(async (resolve, reject)=>{
      await fetchNotes()
      resolve()
    }).then(()=>{
      setLoader(false)
    })
  }
  else{
    navigate("/login")
  }
}, [])

const handleDelete = (id)=>{
  deleteNote(id);
}

const [noteToEdit, setNoteToEdit] = useState("");


  return (
    <>
    <EditNote id={noteToEdit}/>
    <div className="my-5">
          <h4 className='my-4'>Your Notes</h4>
          <hr/>
          <center><RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible={loader}
          /></center>
          <div className="d-flex justify-content-between" style={{gap:"20px", flexWrap:"wrap"}}>
            {notes.length === 0 && !loader && <p>No Notes To Display</p>}
              {notes.map((note)=>{
                return(
                <div className="col notesSection" key={note._id} >
                  <div className="card my-3" style={{height: "99%"}}>
                    <div className="card-header bg-warning">
                      Note
                      <i className="fa-solid fa-pen-to-square" style={{right: "15px", position: "absolute", cursor:"pointer"}}data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setNoteToEdit(note._id)}}></i>
                      <i className="fa-solid fa-trash-can" style={{right: "45px", position: "absolute", cursor:"pointer"}} onClick={()=>{handleDelete(note._id)}}></i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{note.title}</h5>
                      <p className="card-text">{note.description}</p>
                      <p className="btn btn-danger" style={{fontSize: "10px", minWidth:"40px",padding:"5px",border:"2px solid black", borderRadius: "5px", position: "absolute", bottom: "-16px", left: "0"}}>{note.tag}</p>
                    </div>
                  </div>
                </div>
                )
              })
            }
          </div>
    </div>
    </>
  )
}
