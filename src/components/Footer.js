import React from 'react'

export default function Footer() {
  return (
    <div className='mt-10'>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">Copyright &copy; iNoteBook {new Date().getFullYear()}. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
