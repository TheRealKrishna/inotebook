/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get('message');
  const status = params.get('status');

  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
      navigate("/dashboard")
    }
    if(status === "success"){
      toast.success(message)
      navigate("/login")
      return
    }
    else if(status === "error"){
      toast.error(message)
      navigate("/login")
    }
  },[])

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
      e.preventDefault()
      toast.promise(
        new Promise(async(resolve, reject)=>{
          const response = await fetch("https://themescode.shop/api/auth/login", {method:"POST", headers : {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
           });
           const json = await response.json()
           if(json.authtoken){
            localStorage.setItem("auth-token", json.authtoken)
            navigate("/dashboard");
            resolve("Logged In Successfully")
           }
           else if(json.error){
            reject(json.error)
           }
           else{
            reject("An unknown error occured!");
           }
        })
        ,{
        loading: 'Logging In...',
        success: (data)=>data,
        error: (error)=>error,
      });
  }

  return (
    <section className="my-2">
    <div className="container py h-100">
        <div className="row d-flex justify-content-center align-items-center h-">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
            <div className="card-body p-3 text-center">

                <h3 className="mb-5">Log in</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} className="form-control form-control-lg" required />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg" required />
                </div>

                {/* <div className="form-check d-flex justify-content-start mb-4">
                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                </div> */}

                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                </form>
                <p className='m-5'>-------- OR --------</p>
                <p>Not Registered Yet? <Link to="/signup">Create Account</Link></p>
                <p className='m-5'>-------- OR --------</p>
                <p>Forgot Password? <Link to="/forgot-password">Reset Password</Link></p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
  )
}
