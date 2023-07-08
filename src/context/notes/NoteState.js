import React, { useEffect, useState } from "react";
import noteContext from "./NoteContext";
import { Navigate } from "react-router-dom";

const NoteState = (props)=>{
  const [notes, setNotes] = useState([])
  const host = "http://localhost"

  const fetchNotes = async()=>{
    let notesInitial = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "POST",
      headers: {
        'auth-token': localStorage.getItem("auth-token"),
      },
    });
    notesInitial = await notesInitial.json();  
    setNotes(notesInitial.notes)
  }

      // Function to add a note
      const addNote = async (note)=>{
        await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            'auth-token': localStorage.getItem("auth-token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note)
        });
        await fetchNotes()
      }


      // Function to delete a note
      const deleteNote = async (noteId)=>{
          await fetch(`${host}/api/notes/deletenote/${noteId}`, {
          method: "PUT",
          headers: {
            'auth-token': localStorage.getItem("auth-token"),
          },
        });
        await fetchNotes()
      }

      // Function to edit a note
      const editNote = async (noteId, note)=>{
        await fetch(`${host}/api/notes/updatenote/${noteId}`, {
          method: "PUT",
          headers: {
            'auth-token': localStorage.getItem("auth-token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note)
        });
        await fetchNotes()
      }


    return(
        <noteContext.Provider value={{notes, fetchNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;