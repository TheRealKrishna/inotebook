import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="display-4">Welcome to iNoteBook</h1>
        <p className="lead">Your all-in-one solution for note-taking, organizing, and collaboration</p>
        <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
      </div>
    </section>
  
    <section className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="display-4">Effortlessly Take and Organize Notes</h2>
          <p className="lead">With iNoteBook, you can capture your thoughts, ideas, and important information seamlessly.
            Our user-friendly interface allows you to create and organize notes effortlessly.</p>
          <p>Whether you're in a meeting, attending a lecture, or simply want to jot down your thoughts, iNoteBook is the
            perfect tool to keep all your notes in one place.</p>
        </div>
        <div className="col-md-6">
          <h2 className="display-4">Collaborate and Share with Others</h2>
          <p className="lead">iNoteBook makes collaboration easy. Share your notes with colleagues, classmates, or friends and
            work together in real-time.</p>
          <p>Whether you're working on a group project, sharing meeting minutes, or simply want to collaborate on ideas,
            iNoteBook's collaborative features will streamline your teamwork.</p>
        </div>
      </div>
    </section>
  
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="display-4 text-center mb-5">What Our Users Say</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <p className="card-text">"iNoteBook has revolutionized the way I take and manage my notes. It's a fantastic
                  tool that keeps me organized and productive."</p>
                <p className="card-text"><small className="text-muted">- John Doe, Marketing Professional</small></p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <p className="card-text">"As a student, iNoteBook has been a game-changer for me. I can easily access my notes
                  from any device and collaborate with my classmates. Highly recommended!"</p>
                <p className="card-text"><small className="text-muted">- Jane Smith, College Student</small></p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <p className="card-text">"I've tried many note-taking apps, but iNoteBook stands out. It's intuitive,
                  feature-rich, and the user interface is clean and beautiful."</p>
                <p className="card-text"><small className="text-muted">- David Johnson, Freelancer</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
