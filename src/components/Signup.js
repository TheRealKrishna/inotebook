/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
      navigate("/dashboard")
    }
  }, [])

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
      e.preventDefault()
      const response = await fetch("http://localhost/api/auth/createuser", {method:"POST", headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
     });
     const json = await response.json()
     if(json.authtoken){
      localStorage.setItem("auth-token", json.authtoken);
      navigate("/dashboard");
      toast.success('Signup Successful');
     }
     else if(json.error){
      toast.error(json.error);
     }
     else{
      toast.error("An unknown error occured!");
     }
  }

  return (
    <section className="my-4">
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
            <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input type="name" id="name" name="name" value={credentials.name} onChange={onChange} className="form-control form-control-lg" required />
                </div>
                
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="form-control form-control-lg" required />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg" minLength={8}required />
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit">Create Account</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
  )
}
