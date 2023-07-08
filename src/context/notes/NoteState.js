import React, { useEffect, useState } from "react";
import noteContext from "./NoteContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const NoteState = (props)=>{
  const [notes, setNotes] = useState([])
  const host = "https://themescode.shop"

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
        toast.promise(new Promise(async(resolve, reject)=>{
          await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              'auth-token': localStorage.getItem("auth-token"),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
          });
          await fetchNotes()
          resolve("Note Added Succesfully")
          }),
          {
            loading: 'Adding Note...',
            success: (data)=>data,
            error: (error)=>error,
          }
          )
      }


      // Function to delete a note
      const deleteNote = async (noteId)=>{
        toast.promise(new Promise(async(resolve, reject)=>{
          await fetch(`${host}/api/notes/deletenote/${noteId}`, {
          method: "PUT",
          headers: {
            'auth-token': localStorage.getItem("auth-token"),
          },
        });
        await fetchNotes()
        resolve("Note Deleted Succesfully")
        }),
        {
          loading: 'Delete Note...',
          success: (data)=>data,
          error: (error)=>error,
        }
        )
      }

      // Function to edit a note
      const editNote = async (noteId, note)=>{
       toast.promise(new Promise(async (resolve, reject) => {
          await fetch(`${host}/api/notes/updatenote/${noteId}`, {
            method: "PUT",
            headers: {
              'auth-token': localStorage.getItem("auth-token"),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
          });
          await fetchNotes();
          resolve("Note Edited Succesfully")
        }),
        {
          loading: 'Editing Note...',
          success: (data)=>data,
          error: (error)=>error,
        })
      }


    return(
        <noteContext.Provider value={{notes, fetchNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;