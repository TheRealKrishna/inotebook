/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import MailSent from './MailSent';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [mailSent, setMailSent] = useState(false)
  const [tokenValid, setTokenValid] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const message = params.get('message');
  const status = params.get('status');
  const token = params.get('token');

  const verifyToken = async()=>{
    toast.promise(new Promise(async(resolve, reject)=>{
      const response = await fetch("https://themescode.shop/api/auth/verifyresetpasswordtoken", {method:"POST", headers : {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({resetPasswordToken: token})
           });
        const json = await response.json()
        if(json.success){
          resolve("Reset Password Token Verified")
          setTokenValid(true)
        }
        else{
          setTokenValid(false)
          navigate("/forgot-password")
          reject(json.error)
        }
    }),
    {
      loading: 'Verifying Reset Password Token...',
      success: (data)=>data,
      error: (error)=>error,
    }
    )
        
    }

  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
      navigate("/dashboard")
    }
    if(status === "success"){
      toast.success(message)
      return
    }
    else if(status === "error"){
      toast.error(message)
    }
    if(token){
      verifyToken();
    }
  },[])

  const onNewPasswordChange = (e)=>{
    setNewPassword(e.target.value)
  }
  const onConfirmNewPasswordChange = (e)=>{
    setConfirmNewPassword(e.target.value)
  }
  const onEmailChange = (e)=>{
    setEmail(e.target.value)
  }

  const handlePasswordSubmit = async (e)=>{
    e.preventDefault()
    if(newPassword === confirmNewPassword){
      toast.promise(new Promise(async(resolve, reject)=>{
            const response = await fetch("https://themescode.shop/api/auth/resetpassword", {method:"POST", headers : {"Content-Type": "application/json"},
                body: JSON.stringify({password: newPassword, resetPasswordToken: token})
            });
            const json = await response.json();
            if(json.success){
                navigate("/login")
                resolve(json.success)
             }
             else if(json.error){
                reject(json.error)
             }
          }),
          {
            loading: 'Resetting Password...',
            success: (data)=>data,
            error: (error)=>error,
          })
    }
  }
  const handleEmailSubmit = async (e)=>{
      e.preventDefault()
      toast.promise(new Promise(async(resolve, reject)=>{
          const response = await fetch("https://themescode.shop/api/auth/forgotpassword", {method:"POST", headers : {"Content-Type": "application/json"},
                body: JSON.stringify({email: email})
            });
         const json = await response.json();
         if(json.success){
            setMailSent(true);
            resolve("Password Reset Link Sent To Your Email")
         }
         else if(json.error){
            reject(json.error)
         }
      }),
      {
        loading: 'Sending Password Reset Link...',
        success: (data)=>data,
        error: (error)=>error,
      }
    )}


if(tokenValid){
  return (
      <section className="my-4">
      <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
              <div className="card-body p-5 text-center">
  
                  <h3 className="mb-5">Enter Your New Password</h3>
                  <form onSubmit={handlePasswordSubmit}>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="newPasword">New Password</label>
                  <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={onNewPasswordChange} className="form-control form-control-lg" minLength={8} required />
                  </div>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="confirmNewPassword">Confirm New Password</label>
                  <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={confirmNewPassword} onChange={onConfirmNewPasswordChange} className="form-control form-control-lg" minLength={8} required />
                  {newPassword !== confirmNewPassword ? <p className='text-danger'>Passwords Do Not Match</p> : <p></p>}
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Reset</button>
                  </form>
              </div>
              </div>
          </div>
          </div>
      </div>
      </section>
    )
}

else if(mailSent){
    return <MailSent/>
}

else{
    return (
        <section className="my-4">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Reset Password</h3>
                    <form onSubmit={handleEmailSubmit}>
                    <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={onEmailChange} className="form-control form-control-lg" required />
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Reset</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}
}
