import React, { useContext, useState } from 'react'
import '../Css/header1.css'
import { MdMail } from 'react-icons/md'
import { BsFileLockFill } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { FaUserCheck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UidContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { PostUsersDispatch } from '../Redux Folder/Dispatch'
import { GetAdmins } from '../Server/Services'

export default function Loginn() {
  const Admins = GetAdmins()
  const Users = useSelector((state) => state.UsersReduser)
  const state = useSelector((state) => state.MainReduser)
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const { uid, setUid } = useContext(UidContext)
  const [DataRegister, setDataRegister] = useState({})
  const [DataLogin, setDataLogin] = useState({})
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
    // let lo = -1
    // for (let j of Users) {
    //   if (DataLogin.fname === j.username && DataLogin.pass === j.userpass) {
    //     lo = j;
    //     break
    //   }
    // }
    // if (lo === -1) {
    //   alert("UserName or Password Incorrect.")
    // } else if (LoginChecked === "") {
    //   alert("Please, Select Admin or User")
    // } else if (LoginChecked === "Admin") {
    //   alert("Login Successfully Admin")
    //   setUid(1)
    //   nevigate("/Home")
    // } else {
    //   alert("Login Successfully User")
    //   setUid(0)
    //   nevigate("/MyAccount")
    // }
    if (LoginChecked === "") {
      alert("Please, Select Admin or User")
    } else if (LoginChecked === "Admin") {
      let lo = -1
      for (let j of Admins) {
        if (DataLogin.fname === j.username && DataLogin.pass === j.userpass) {
          lo = j;
          break
        }
      }
      if (lo === -1) {
        alert("UserName or Password Incorrect.")
      } else {
        alert("Login Successfully By Admin")
        setUid(1)
        nevigate("/Home")
      }
    } else if (LoginChecked === "User") {
      let bo = -1
      for (let j of Users) {
        if (DataLogin.fname === j.username && DataLogin.pass === j.userpass) {
          bo = j;
          break
        }
      }
      if (bo === -1) {
        alert("UserName or Password Incorrect.")
      } else {
        alert("Login Successfully By User")
        setUid(0)
        nevigate("/MyAccount")
      }
    }
  }
  const RegisterSubmit = (event) => {
    event.preventDefault()
    let lo = -1
    for (let i of Users) {
      if (DataRegister.username === i.username || DataRegister.useremail === i.useremail) {
        lo = i
        alert("UserName or Email Exists. Please Use new one.")
        break
      }
    }
    for (let i of Admins) {
      if (DataRegister.username === i.username || DataRegister.useremail === i.useremail) {
        lo = i
        alert("UserName or Email Exists. Please Use new one.")
        break
      }
    }
    if (lo === -1) {
      let AddId = 1;
      if (Users.length > 0) {
        AddId = Users[Users.length - 1].id + 1
      }
      dispatch(PostUsersDispatch(DataRegister, AddId, "Users"));
      setDataRegister({})
    }
  }
  return (
    <>
      <div className="Main">
        <div className={wrapper}>
          <Link className='icon-close' ><MdOutlineClose value="MainClose" onClick={MainClose} /></Link>
          <div className='form-box login'>
            <h2>login</h2>
            <form onSubmit={LoginSubmit} id="LoginForm">
              <div className='input-box'>
                <span className='icon'><MdMail /></span>
                <input type="text" required value={DataLogin.fname || ""} onChange={(event) => { setDataLogin({ ...DataLogin, "fname": event.target.value }) }} />
                <label>Username</label>
              </div>
              <div className='input-box'>
                <span className='icon'><BsFileLockFill /></span>
                <input type="password" required value={DataLogin.pass || ""} onChange={(event) => { setDataLogin({ ...DataLogin, "pass": event.target.value }) }} />
                <label>Password</label>
              </div>
              <div className='remember-forgot' >
                <label><input type="radio" name="logradio" onClick={(event) => setLoginChecked(event.target.value)} checked={LoginChecked === "Admin"} value="Admin" />Admin</label>
                <label><input type="radio" name="logradio" onClick={(event) => setLoginChecked(event.target.value)} checked={LoginChecked === "User"} value="User" />User</label>
                {/* <a href="#">Forgot Password</a> */}
              </div>
              <button type='submit' className='btnnnn' >Login</button>
              <div className='login-register'>
                <p>Don't have an account?<Link href="#" className='register-link' name="Register" onClick={ChangeChange}>Register</Link></p>
              </div>
            </form>
          </div>
          <div className='form-box register' id="RegisterForm">
            <h2>Registration</h2>
            <form onSubmit={RegisterSubmit}>
              <div className='input-box'>
                <span className='icon'><FaUserCheck /></span>
                <input type="text" required onChange={(event) => { setDataRegister({ ...DataRegister, "username": event.target.value }) }} value={DataRegister.username || ""} />
                <label>Username</label>
              </div>
              <div className='input-box'>
                <span className='icon'><MdMail /></span>
                <input type="email" required onChange={(event) => { setDataRegister({ ...DataRegister, "useremail": event.target.value }) }} value={DataRegister.useremail || ""} />
                <label>Email</label>
              </div>
              <div className='input-box'>
                <span className='icon'><BsFileLockFill /></span>
                <input type="password" required onChange={(event) => { setDataRegister({ ...DataRegister, "userpass": event.target.value }) }} value={DataRegister.userpass || ""} />
                <label>Password</label>
              </div>
              <button type='submit' className='btnnnn'>Registar</button>
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
