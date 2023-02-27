import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Css/Style.css'
import '../Css/Inhouse.css'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { GetRoomList } from '../Server/Services';
import { useDispatch, useSelector } from 'react-redux';
import { PostDispatch } from '../Redux Folder/Dispatch';
import TableDisplay from './TableDisplay';
// import moment from 'moment';

export default function Walkin() {
    const state = useSelector((state) => state.MainReduser)
    console.log(state)
    const navigate = useNavigate()
    let RoomType = ""
    const RoomList = GetRoomList()
    const dispatch = useDispatch()
    const [SeltdRomTy, setSeltdRomTy] = useState(RoomList[0])
    const [Data, setData] = useState({ "status": "In House", "roomtype": "NQ1", "roomfacility": SeltdRomTy.facility, "roomno": SeltdRomTy.rooms[0], "rate": SeltdRomTy.rate })
    const [Rate, setRate] = useState(Number(SeltdRomTy.rate))
    const [Adults, setAdults] = useState(0)
    const [Child, setChild] = useState(0)
    const [TotalPerson, setTotalPerson] = useState(0)
    const [HandleStayDays, setHandleStayDays] = useState(1);
    // const disabledDate1 = (current) => {
    //     return current && current < dayjs().startOf('day');
    // };
    const disabledDate2 = (current) => {
        return (current) && (current) < dayjs().add(1, 'day').endOf('day');
    };
    const TotapDays = () => {
        var d1 = document.getElementById("d1").value
        var d2 = document.getElementById("d2").value
        const dateOne = new Date(d1)
        const dateTwo = new Date(d2)
        const diff = Math.abs(dateTwo - dateOne)
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        setHandleStayDays(days)
        setData({ ...Data, "checkin": d1, "checkout": d2, "staydays": days })
    }
    const SelectRoomType = (event) => {
        RoomType = event.target.value
        document.getElementById("RoomNoInput").selectedIndex = 1
        if (RoomType !== "Room Type") {
            for (let i = 0; i < RoomList.length; i++) {
                if (RoomType === RoomList[i].type) {
                    setSeltdRomTy(RoomList[i])
                    setRate(RoomList[i].rate)
                    setData({ ...Data, "roomtype": RoomList[i].type, "roomfacility": RoomList[i].facility, "roomno": RoomList[i].rooms[0], "rate": RoomList[i].rate })
                    break
                }
            }
        } else {
            setSeltdRomTy([])
            setRate(0)
        }
    }
    useEffect(() => {
        setTotalPerson(Number(Adults) + Number(Child))
    }, [Adults, Child])
    const FinalSubmit = (event) => {
        event.preventDefault()
        let AddId = 1;
        if (state.length > 0) {
            AddId = state[state.length - 1].id + 1
        }
        dispatch(PostDispatch(Data, AddId, "MainDataApi"))
        setData({ "roomtype": "NQ1", "roomfacility": SeltdRomTy.facility, "roomno": SeltdRomTy.rooms[0], "rate": SeltdRomTy.rate })
        document.getElementById("MainForm").reset()
        navigate("/Home")
    }
    return (
        <>
            <Container className="my-2">
                <Form onSubmit={FinalSubmit} id="MainForm">
                    <Row className="border border-2 border-warning rounded-1">
                        <Col xs={12} className="text-center">
                            <h3>Personal Detail</h3>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-1">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control className="iinput" required type="text" placeholder="Enter Name" onChange={(event) => { setData({ ...Data, "fname": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control className="iinput" required type="text" placeholder="Enter Address" onChange={(event) => { setData({ ...Data, "address": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="iinput" required type="email" placeholder="Enter email" onChange={(event) => { setData({ ...Data, "email": event.target.value }) }} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control className="iinput" required type="number" placeholder="Mo. Number" id="number" onChange={(event) => { setData({ ...Data, "telephone": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="border border-2 border-warning rounded-1 mt-2">
                        <Col xs={12} className="text-center">
                            <h3>Hotel Inventary</h3>
                        </Col>
                        <Col xs={12}>
                            <InputGroup className="mb-1 w-25">
                                <InputGroup.Text>Status</InputGroup.Text>
                                <Form.Select>
                                    return <option value="In House">In House</option>
                                </Form.Select>
                                {/* <Form.Control className="w-50" required type="text" placeholder="Enter Name" onChange={(event) => { setData({ ...Data, "fname": event.target.value }) }} /> */}
                            </InputGroup>
                        </Col>

                        <Col md={4}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Check In</InputGroup.Text>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    // disabledDate={disabledDate1}
                                    defaultValue={dayjs().startOf('day')}
                                    disabled
                                    id="d1"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Check Out</InputGroup.Text>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    disabledDate={disabledDate2}
                                    defaultValue={dayjs().add(1, 'day').endOf('day')}
                                    id="d2"
                                    onChange={TotapDays}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Totap Days</InputGroup.Text>
                                <Form.Control type="number" value={HandleStayDays} disabled />
                            </InputGroup>
                        </Col>


                        <Col md={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Total Adults</InputGroup.Text>
                                <Form.Control type="number" id="TotalAdults" required value={Adults || ""} onChange={(event) => { setAdults(parseInt(event.target.value)); setData({ ...Data, "adults": event.target.value }) }} />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total Children</InputGroup.Text>
                                <Form.Control type="number" id="TotalChild" required value={Child || ""} onChange={(event) => { setChild(parseInt(event.target.value)); setData({ ...Data, "childs": event.target.value }) }} />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total Persons</InputGroup.Text>
                                <Form.Control type="number" disabled value={TotalPerson} />
                            </InputGroup>
                        </Col>

                        <Col md={2}>
                            <Form.Select className="mb-1" required onChange={(event) => SelectRoomType(event)}>
                                {
                                    RoomList.map((res, index) => {
                                        return <option value={res.type}>{res.type}</option>
                                    })
                                }
                            </Form.Select>
                        </Col>
                        <Col md={8}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Facility</InputGroup.Text>
                                <Form.Control as="textarea" disabled value={SeltdRomTy.facility || ""} className="Facility" />
                            </InputGroup>
                        </Col>
                        <Col md={2}>
                            <Form.Select className="mb-1" id="RoomNoInput" onChange={(event) => { setData({ ...Data, "roomno": event.target.value }) }}>
                                {
                                    SeltdRomTy.rooms.map((res, index) => {
                                        return <option value={res}>{res}</option>
                                    })
                                }
                            </Form.Select>
                        </Col>

                        <Col md={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Room Rate</InputGroup.Text>
                                <Form.Control type="number" required value={Rate || ""} onChange={(event) => { setRate(event.target.value); setData({ ...Data, "rate": event.target.value }) }} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Tax</InputGroup.Text>
                                <Form.Control disabled type="number" value={(Number(Rate) * (0.09)).toFixed(2)} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total</InputGroup.Text>
                                <Form.Control disabled type="number" value={(Number(Rate) + (Number(Rate) * 0.09)).toFixed(2)} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Grand Total</InputGroup.Text>
                                <Form.Control disabled type="number" value={((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)).toFixed(2)} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="border border-2 border-warning rounded-1 mt-2">
                        <Col xs={12} className="text-center">
                            <h3>Account Section</h3>
                        </Col>
                        <Col xs={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Total Charge</InputGroup.Text>
                                <InputGroup.Text className="fw-bold bg-warning" >{((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)).toFixed(2)}</InputGroup.Text>
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Paid Amount</InputGroup.Text>
                                <InputGroup.Text className="fw-bold bg-success text-white">{((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)).toFixed(2)}</InputGroup.Text>
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Due Amount</InputGroup.Text>
                                <InputGroup.Text className="fw-bold bg-danger text-white">{((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)).toFixed(2)}</InputGroup.Text>
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>

                        <TableDisplay />



                    </Row>


                    <div className="mt-2 d-flex justify-content-center">
                        <Button variant="warning" type="submit" className="SubmitButton" >
                            Final Submit
                        </Button>
                    </div>
                </Form>
            </Container>

            {/* <Container >
                <Row>
                    <Col xs>
                        <Form.Control className="iinput" type="text" placeholder="1" className="mb-2" />
                    </Col>
                    <Col xs>
                        <Row>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="2.1" className="mb-2" />
                            </Col>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="2.2" className="mb-2" />
                            </Col>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="2.3" className="mb-2" />
                            </Col>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="2.4" className="mb-2" />
                            </Col>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="2.5" className="mb-2" />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs>
                        <Row>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="3.1" className="mb-2" />
                            </Col>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="3.2" className="mb-2" />
                            </Col>
                            <Col>
                                <Form.Control className="iinput" type="email" placeholder="3.3" className="mb-2" />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs>
                        <Form.Control className="iinput" type="number" placeholder="4" id="number" className="mb-2" />
                    </Col>
                </Row>
            </Container> */}
        </>
    )
}
