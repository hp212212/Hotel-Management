import React, { useContext, useState } from 'react'
import '../Css/header1.css'
import { MdMail } from 'react-icons/md'
import { BsFileLockFill } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { FaUserCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { UidContext } from '../App'

export default function Loginn() {
  const { uid, setUid } = useContext(UidContext)
  const [LoginChecked, setLoginChecked] = useState("")
  const [wrapper, setWrapper] = useState("wrapper active-popup")
  const ChangeChange = (event) => {
    if (event.target.name === "Register") {
      setWrapper("wrapper active")
    } else if (event.target.name === "Login") {
      setWrapper("wrapper active-popup")
    } else if (event.target.name === "MainLogin") {
      setWrapper("wrapper active-popup")
    }
  }
  const MainClose = () => {
    setWrapper("wrapper")
  }
  const LoginSubmit = (event) => {
    event.preventDefault()
    if (LoginChecked === "") {
      alert("Please, Select Admin or User")
    }else{
      
    }
  }
  const RegisterSubmit = () => {

  }
  return (
    <>
      <div className="Main">
        <div className={wrapper}>
          <Link className='icon-close' ><MdOutlineClose value="MainClose" onClick={MainClose} /></Link>
          <div className='form-box login'>
            <h2>login</h2>
            <form onSubmit={LoginSubmit} >
              <div className='input-box'>
                <span className='icon'><MdMail /></span>
                <input type="email" required />
                <label>Email</label>
              </div>
              <div className='input-box'>
                <span className='icon'><BsFileLockFill /></span>
                <input type="password" required />
                <label>Password</label>
              </div>
              <form className='remember-forgot' >
                <label><input type="radio" name="logradio" onClick={(event) => setLoginChecked(event.target.value)} checked={LoginChecked === "Admin"} value="Admin" />Admin</label>
                <label><input type="radio" name="logradio" onClick={(event) => setLoginChecked(event.target.value)} checked={LoginChecked === "User"} value="User" />User</label>
                {/* <a href="#">Forgot Password</a> */}
              </form>
              <button type='submit' className='btnnnn' >Login</button>
              <div className='login-register'>
                <p>Don't have an account?<Link href="#" className='register-link' name="Register" onClick={ChangeChange}>Register</Link></p>
              </div>
            </form>
          </div>
          <div className='form-box register'>
            <h2>Registration</h2>
            <form onSubmit={RegisterSubmit}>
              <div className='input-box'>
                <span className='icon'><FaUserCheck /></span>
                <input type="text" required />
                <label>Username</label>
              </div>
              <div className='input-box'>
                <span className='icon'><MdMail /></span>
                <input type="email" required />
                <label>Email</label>
              </div>
              <div className='input-box'>
                <span className='icon'><BsFileLockFill /></span>
                <input type="password" required />
                <label>Password</label>
              </div>
              <button type='submit' className='btnnnn'>Reistar</button>
              <div className='login-register'>
                <p>Already have an account?<Link href="#" className='login-link' name="Login" onClick={ChangeChange}>Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
