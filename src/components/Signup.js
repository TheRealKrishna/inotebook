/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AccountCreated from './AccountCreated';

export default function Signup() {
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
  const navigate = useNavigate();
  const [accountCreated, setAccountCreated] = useState(false)

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
    toast.promise(
      new Promise(async (resolve, reject)=>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/createuser`, {method:"POST", headers : {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
          });
        const json = await response.json()
        if(json.success){
          resolve("Account Created Successfully!")
          setAccountCreated(true)
        }
        else if(json.error){
          reject(json.error)
        }
        else{
          reject("An unknown error occured!")
        }
      })
      ,{
      loading: 'Creating Account...',
      success: (data)=>data,
      error: (error)=>error,
    });
  }

  if (accountCreated) {
    return <AccountCreated />;
  }
  else{
    return (
      <section className="my-2">
      <div className="container py-1 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">

                  <h3 className="mb-5">Sign Up</h3>
                  <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input type="name" id="name" name="name" value={credentials.name} onChange={onChange} className="form-control form-control-lg" minLength={3} required />
                  </div>
                  
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="form-control form-control-lg" required />
                  </div>

                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg" minLength={8}required />
                  </div>
                  <div class="g-recaptcha" data-sitekey="your_site_key"></div>
                  <br/>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Create Account</button>
                  </form>
                  <p className='m-5'>-------- OR --------</p>
                  <p>Already Have An Account? <Link to="/login">Login</Link></p>
              </div>
              </div>
          </div>
          </div>
      </div>
      </section>
    )
  }
}
