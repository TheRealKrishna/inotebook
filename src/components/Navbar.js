import React from 'react'
import { Link } from 'react-router-dom'
import logo from "./Logo.png"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img style={{width: "150px", marginTop: "-15px", marginRight: "15px"}} src={logo} alt="iNoteBook" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-white" to="/myNotes">Link</Link>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <Link to="/login"><button className="btn btn-dark mx-2">Login</button></Link>
                <Link to="/login"><button className="btn btn-dark mx-2">SignUp</button></Link>
            </form>
            </div>
        </div>
    </nav>
  )
}
