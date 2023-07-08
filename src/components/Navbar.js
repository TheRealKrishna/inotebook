import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../logo.svg"
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const location = useLocation();
  const handleLogout = ()=>{
    localStorage.removeItem("auth-token")
    toast("Logged Out Succesfully")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top position-sticky" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img style={{width: "35px",marginRight: "15px"}} src={logo} alt="iNoteBook" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                </li>
            </ul>
            <form className="d-flex" role="search">
            {localStorage.getItem("auth-token") ? <Link to="/dashboard"><button className="btn btn-primary mx-2">Dashboard</button></Link> : <Link to="/login"><button className="btn btn-primary mx-2">Login</button></Link>}
            {localStorage.getItem("auth-token") ? <Link onClick={handleLogout} to="/"><button className="btn btn-danger btn-outline mx-2">Logout</button></Link> : <Link to="/signup"><button className="btn btn-primary mx-2">Sign Up</button></Link>}
            </form>
            </div>
        </div>
    </nav>
  )
}
