import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container my-5" style={{height: "72vh"}}>
        <div className="jumbotron">
          <h1 className="display-4">Welcome to iNoteBook</h1>
          <p className="lead">Save and organize your notes online.</p>
          <hr className="my-4" />
          <p>Start using iNoteBook today and never lose your notes again!</p>
          <Link className="btn btn-primary btn-lg" to="/signup" role="button">Get Started</Link>
        </div>
    </div>
  )
}
