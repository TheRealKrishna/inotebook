import React from 'react'
import mail from "./mail.png"

export default function AccountCreated() {

  return (
  <section className="container py-5 my-5">
    <div className="row">
      <div className="col-md-6">
        <img style={{width: "50%"}} src={mail} alt="" />
      </div>
      <div className="col-md-6">
        <h2 className="display-4">Account Created Succesfully!</h2>
        <p className="lead">Please check your mail box to verify your email address, A verification link has been sent to your email address.</p>
        <p>You will be able to login into your account once you verify your email address.</p>
      </div>
    </div>
  </section>
  )
}
