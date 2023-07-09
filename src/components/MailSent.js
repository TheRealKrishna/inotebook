import React from 'react'
import mail from "./mail.png"

export default function MailSent() {

  return (
  <section className="container py-5 my-5">
    <div className="row">
      <div className="col-md-6">
        <img style={{width: "50%"}} src={mail} alt="" />
      </div>
      <div className="col-md-6">
        <h2 className="display-4">Password Reset Link Sent!</h2>
        <p className="lead">Please check your mail box to verify your email address, A verification link has been sent to your email address.</p>
        <p>You will be able to reset your password by clicking the link sent to you via mail.</p>
      </div>
    </div>
  </section>
  )
}
