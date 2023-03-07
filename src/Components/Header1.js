import React, { useState } from 'react'
import '../Css/header1.css'
import { MdMail } from 'react-icons/md'
import { BsFileLockFill } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { FaUserCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header1() {
  const [wrapper, setWrapper] = useState("wrapper")
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
  return (
    <>
      <header>
        <h2 className="logo">Logo</h2>
        <nav className='navigation'>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Service</a>
          <button className='btnLogin-popup' name="MainLogin" onClick={ChangeChange}>Login</button>
        </nav>
      </header>

      <div className={wrapper}>
        <Link className='icon-close' ><MdOutlineClose value="MainClose" onClick={MainClose} /></Link>
        <div className='form-box login'>
          <h2>login</h2>
          <form action='#'>
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
            <div className='remember-forgot'>
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot Password</a>
            </div>
            <button type='submit' className='btnnnn'>Login</button>
            <div className='login-register'>
              <p>Don't have an account?<a href="#" className='register-link' name="Register" onClick={ChangeChange}>Register</a></p>
            </div>
          </form>
        </div>
        <div className='form-box register'>
          <h2>Registration</h2>
          <form action='#'>
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
            <div className='remember-forgot'>
              <label><input type="checkbox" />I agree to the terms & conditions.</label>
            </div>
            <button type='submit' className='btnnnn'>Reistar</button>
            <div className='login-register'>
              <p>Already have an account?<a href="#" className='login-link' name="Login" onClick={ChangeChange}>Login</a></p>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
