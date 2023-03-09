import React, { useContext, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UidContext } from '../App'
import { Table } from 'antd';
import dayjs from 'dayjs';

export default function Userss() {
  let now = dayjs().format('YYYY-MM-DD')
  const { uid, setUid } = useContext(UidContext)
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id)
  const Users = useSelector((state) => state.UsersReduser)
  let OneUser = {}
  for (let i of Users) {
    if (i.id === Number(id)) {
      OneUser = i
      break
    }
  }
  const Reservation = useSelector((state) => state.MainReduser)
  // const [User, setUser] = useState(kakaji)
  const LogOut = () => {
    navigate("/Login")
    setUid(-1)
  }
  const NewReservation = () => {
    navigate(`/MyAccount/${uid}/Reservation`)
  }

  const columns = [
    {
      title: 'Check in',
      dataIndex: 'Checkin',
    },
    {
      title: 'Check out',
      dataIndex: 'Checkout',
    },
    {
      title: 'Days',
      dataIndex: 'Days',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
    },
    {
      title: 'Persons',
      dataIndex: 'Persons',
    },
    {
      title: 'Room Type',
      dataIndex: 'RoomType',
    },
    {
      title: 'Room',
      dataIndex: 'Room',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
    }
  ];
  const data1 = [];
  const data2 = [];
  for (let i of Reservation) {
    let ka = 0
    if (i.UserName === OneUser.username) {
      if (i.checkin < now) {
        data2.push({
          key: i.id,
          Checkin: i.checkin,
          Checkout: i.checkout,
          Days: i.staydays,
          Name: i.fname,
          Persons: (i.adults) + (i.childs),
          RoomType: i.roomtype,
          Room: i.roomno,
          Amount: ((Number(i.rate) + (Number(i.rate) * 0.09)) * Number(i.staydays)).toFixed(2),
        })
      } else {
        data1.push({
          key: i.id,
          Checkin: i.checkin,
          Checkout: i.checkout,
          Days: i.staydays,
          Name: i.fname,
          Persons: (i.adults) + (i.childs),
          RoomType: i.roomtype,
          Room: i.roomno,
          Amount: ((Number(i.rate) + (Number(i.rate) * 0.09)) * Number(i.staydays)).toFixed(2),
        })
      }
    }
  }
  return (
    <><Container fluid className="UserssContainer">
      <Row className="align-items-center">
        <Col xs={12}>
          <h1>Welcome {OneUser.fname}</h1>
        </Col>
        <Col xs={12} className="d-flex justify-content-between mb-1">
          <Button size="sm" variant="outline-danger" onClick={NewReservation}>Book New Room Now</Button>
          <Button variant="outline-danger" onClick={LogOut}>Log Out</Button>
        </Col>
        <Col xs={12}>
          <h3>Upcoming Reservations</h3>
        </Col>
        <Col xs={12}>
          <Table columns={columns} dataSource={data1} size="small" />
        </Col>
        <Col xs={12}>
          <h3>Past Reservations</h3>
        </Col>
        <Col xs={12}>
          <Table columns={columns} dataSource={data2} size="small" />
        </Col>
      </Row>
    </Container>
    </>
  )
}
