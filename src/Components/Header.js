import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {MdLocalHotel} from 'react-icons/md'
import "../Css/Style.css"

export default function Header() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" className="p-0 border-1" style={{ backgroundColor: "#dd377c" }}>
        <Container fluid="xxl">
          <Navbar.Brand as={NavLink} to={"/"} className="ps-5 d-flex align-items-center fw-bold" style={{ color: "blue" }}><MdLocalHotel className="me-1"/>સદગુરુ કૃપા</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-0" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav ><Nav.Link as={NavLink} to={"/Home"} className="ms-5 navlink" style={{ fontWeight: "bold" }} >Home</Nav.Link></Nav>
            <Nav><Nav.Link as={NavLink} to={"/Loginn"} className=" navlink" style={{ fontWeight: "bold" }}>Login</Nav.Link></Nav>
            {/* <Nav><Nav.Link as={NavLink} to={"/Home"} className=" navlink" style={{ fontWeight: "bold" }}>Transections</Nav.Link></Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
