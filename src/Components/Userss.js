import React, { useContext, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UidContext } from '../App'

export default function Userss() {
  const { setUid } = useContext(UidContext)
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id)
  const kaka = useSelector((state) => state.UsersReduser)
  let kakaji = {}
  for (let i of kaka) {
    if (i.id === Number(id)) {
      kakaji = i
    }
  }
  const [User, setUser] = useState(kakaji)
  const LogOut = () => {
    navigate("/Login")
    setUid(-1)
  }
  return (
    <><Container fluid className="bg-info">
      <Row className="align-items-center">
        <Col xs={8} sm={9} md={9} lg={11}>
          <h1 className='text-center'>Welcome {User.fname}</h1>
        </Col>
        <Col xs={4} sm={3} md={3} lg={1}>
          <Button variant="outline-danger" onClick={LogOut}>Log Out</Button>
        </Col>
      </Row>
    </Container>
    </>
  )
}
