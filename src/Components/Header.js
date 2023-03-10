import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MdLocalHotel } from 'react-icons/md'
import "../Css/Style.css"
import { UidContext } from '../App';

export default function Header() {
  let linkk = "yes"
  let Titlee = "no"
  const { uid } = useContext(UidContext)
  if (uid === -1) {
    linkk = "/Login"
    Titlee = "My Account"
  } else if (uid === 0) {
    linkk = "/Home"
    Titlee = "Home"
  } else {
    linkk = `/MyAccount/${uid}`
    Titlee = "My Account"
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" className="p-0 border-1" style={{ backgroundColor: "#dd377c" }}>
        <Container fluid="xxl">
          <Navbar.Brand as={NavLink} to={"/"} className="ps-5 d-flex align-items-center fw-bold" style={{ color: "blue" }}><MdLocalHotel className="me-1" />સદગુરુ કૃપા</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-0" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav ><Nav.Link as={NavLink} to={linkk} className="ms-5 navlink" style={{ fontWeight: "bold" }} >{Titlee}</Nav.Link></Nav>
            <Nav><Nav.Link as={NavLink} to={"/Login"} className=" navlink" style={{ fontWeight: "bold" }}>Login</Nav.Link></Nav>
            {/* <Nav><Nav.Link as={NavLink} to={"/Email"} className=" navlink" style={{ fontWeight: "bold" }}>Email</Nav.Link></Nav> */}
            {/* <Nav><Nav.Link as={NavLink} to={"/Home"} className=" navlink" style={{ fontWeight: "bold" }}>Transections</Nav.Link></Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
