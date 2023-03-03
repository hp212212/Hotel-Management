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
import { FindRoomsDispatch, PostDispatch } from '../Redux Folder/Dispatch';
import TableDisplay from './TableDisplay';
// import moment from 'moment';

export default function Walkin() {
    let now = dayjs().format('YYYY-MM-DD')
    const state = useSelector((state) => state.MainReduser)
    const AvailableRooms = useSelector((state) => state.FindRooms)
    const [CheckIn, setCheckIn] = useState(dayjs().startOf('day').format('YYYY-MM-DD'))
    const [CheckOut, setCheckOut] = useState(dayjs().startOf('day').format('YYYY-MM-DD'))
    const navigate = useNavigate()
    let RoomType = ""
    // const RoomList = []
    const RoomList = GetRoomList()
    const dispatch = useDispatch()
    const [Data, setData] = useState({ "checkin": CheckIn, "checkout": CheckOut, "account": [], "status": "In House" })
    const [SeltdRomTy, setSeltdRomTy] = useState("")
    const [Rate, setRate] = useState(0)
    const [HandleStayDays, setHandleStayDays] = useState(0);
    const [PaidAmount, setPaidAmount] = useState(0)
    const [PaymentData, setPaymentData] = useState({})
    const [Adults, setAdults] = useState(0)
    const [Child, setChild] = useState(0)
    const [TotalPerson, setTotalPerson] = useState(0)
    // const disabledDate1 = (current) => {
    //     return current && current < dayjs().startOf('day');
    // };
    const disabledDate2 = (current) => {
        return (current) && (current) < dayjs().startOf('day');
    };
    const TotapDays = () => {
        var d1 = document.getElementById("d1").value
        var d2 = document.getElementById("d2").value
        const dateOne = new Date(d1)
        const dateTwo = new Date(d2)
        const diff = Math.abs(dateTwo - dateOne)
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        setCheckIn(d1)
        setCheckOut(d2)
        setHandleStayDays(days)
        setData({ ...Data, "checkin": d1, "checkout": d2, "staydays": days })
        if (SeltdRomTy !== "") {
            dispatch(FindRoomsDispatch(d1, d2, SeltdRomTy.type))
        } else {
            dispatch(FindRoomsDispatch(d1, d2, ""))
        }
    }
    const SelectRoomType = (event) => {
        RoomType = event.target.value
        document.getElementById("RoomNoInput").selectedIndex = 0
        if (RoomType !== "Select Room Type") {
            for (let i = 0; i < RoomList.length; i++) {
                if (RoomType === RoomList[i].type) {
                    setSeltdRomTy(RoomList[i])
                    setRate(RoomList[i].rate)
                    setData({ ...Data, "roomtype": RoomList[i].type, "roomfacility": RoomList[i].facility, "roomno": RoomList[i].rooms[0], "rate": RoomList[i].rate })
                    if (CheckIn < CheckOut) {
                        dispatch(FindRoomsDispatch(CheckIn, CheckOut, RoomType))
                    }
                    break
                }
            }
        } else {
            dispatch(FindRoomsDispatch(CheckIn, CheckOut, RoomType))
            setSeltdRomTy("")
            setRate(0)
        }
    }
    const SelectRoomRate = (event) => {
        if (event.target.value !== "Select Room") {
            setData({ ...Data, "roomno": Number(event.target.value) })
        }
    }
    useEffect(() => {
        setTotalPerson(Number(Adults) + Number(Child))
    }, [Adults, Child])
    const AddPayment = () => {
        if (PaymentData.paymentmethod === "none" || PaymentData.amount === 0 || Object.keys(PaymentData).length === 0) {
            alert("please Add valid Paymint.")
            document.getElementById("SelectPaymentMethod").selectedIndex = 0
            document.getElementById("PaymentAmount").value = ''
        } else {
            // setPaymentData({ ...PaymentData, "date": now })
            PaymentData["date"] = now
            setPaidAmount((Number(PaidAmount) + Number(PaymentData.amount)).toFixed(2))
            Data.account.push(PaymentData)
            setPaymentData({})
            document.getElementById("SelectPaymentMethod").selectedIndex = 0
            document.getElementById("PaymentAmount").value = ''
        }
    }
    const FinalSubmit = (event) => {
        event.preventDefault()
        if (TotalPerson === 0) {
            alert("Please, Enter atlease one Adult")
            document.getElementById("TotalAdults").focus()
        } else if (HandleStayDays === 0) {
            alert("Please Some Days")
        } else if (SeltdRomTy === "") {
            alert("Please Select Room Type")
        } else if (document.getElementById("RoomNoInput").value === "Select Room") {
            alert("Please Select Room")
        } else {
            let AddId = 1;
            if (state.length > 0) {
                AddId = state[state.length - 1].id + 1
            }
            dispatch(PostDispatch(Data, AddId, "MainDataApi"))
            setData({ "checkin": CheckIn, "checkout": CheckOut, "account": [], "status": "In House" })
            document.getElementById("MainForm").reset()
            navigate("/Home")
        }
    }
    return (
        <>
            <Container className="my-2">
                <Form onSubmit={FinalSubmit} id="MainForm">

                    {/* ---------------------Personal Detail------------------------------ */}

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
                        <Col lg={6}>
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="iinput" required type="email" placeholder="Enter email" onChange={(event) => { setData({ ...Data, "email": event.target.value }) }} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control className="iinput" required type="number" placeholder="Mo. Number" id="number" onChange={(event) => { setData({ ...Data, "telephone": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* ---------------------Hotel Inventary------------------------------ */}

                    <Row className="border border-2 border-warning rounded-1 mt-2">
                        <Col xs={12} className="text-center">
                            <h3>Hotel Inventary</h3>
                        </Col>
                        <Col md={12}>
                            <InputGroup className="mb-1 w-50">
                                <InputGroup.Text>Status</InputGroup.Text>
                                <Form.Select>
                                    return <option value="In House">In House</option>
                                </Form.Select>
                                {/* <Form.Control className="w-50" required type="text" placeholder="Enter Name" onChange={(event) => { setData({ ...Data, "fname": event.target.value }) }} /> */}
                            </InputGroup>
                        </Col>

                        <Col lg={4}>
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
                        <Col lg={4}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Check Out</InputGroup.Text>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    disabledDate={disabledDate2}
                                    defaultValue={dayjs().startOf('day')}
                                    id="d2"
                                    onChange={TotapDays}
                                />
                            </InputGroup>
                        </Col>
                        <Col lg={4}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Totap Days</InputGroup.Text>
                                <Form.Control type="number" value={HandleStayDays} disabled />
                            </InputGroup>
                        </Col>


                        <Col lg={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Total Adults</InputGroup.Text>
                                <Form.Control type="number" pattern="[0-9]" id="TotalAdults" required value={Adults || ""} onChange={(event) => { setAdults(event.target.value); setData({ ...Data, "adults": Number(event.target.value) }) }} />
                            </InputGroup>
                        </Col>
                        <Col lg={4}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total Children</InputGroup.Text>
                                <Form.Control type="number" pattern="[0-9]" id="TotalChild" required value={Child || ""} onChange={(event) => { setChild(event.target.value); setData({ ...Data, "childs": Number(event.target.value) }) }} />
                            </InputGroup>
                        </Col>
                        <Col lg={4}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total Persons</InputGroup.Text>
                                <Form.Control type="number" disabled value={TotalPerson} />
                            </InputGroup>
                        </Col>

                        <Col lg={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Room Type</InputGroup.Text>
                                <Form.Select required onChange={(event) => SelectRoomType(event)}>
                                    <option value="Select Room Type">Select Room Type</option>
                                    {
                                        RoomList.map((res, index) => {
                                            return <option value={res.type}>{res.type}</option>
                                        })
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col lg={6}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Facility</InputGroup.Text>
                                <Form.Control as="textarea" disabled value={SeltdRomTy.facility || ""} className="Facility" />
                            </InputGroup>
                        </Col>
                        <Col lg={3}><InputGroup className="mb-1" >
                            <InputGroup.Text>Room No.</InputGroup.Text>
                            <Form.Select id="RoomNoInput" onChange={(event) => SelectRoomRate(event)}>
                                <option value="Select Room">Select Room</option>
                                {
                                    AvailableRooms !== "" ?
                                        (AvailableRooms.map((res, index) => {
                                            return <option value={res}>{res}</option>
                                        })) : null
                                }
                            </Form.Select>
                        </InputGroup>
                        </Col>

                        <Col lg={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Room Rate</InputGroup.Text>
                                <Form.Control type="number" pattern="[0-9]" required value={Rate || ""} onChange={(event) => { setRate(Number(event.target.value)); setData({ ...Data, "rate": Number(event.target.value) }) }} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Tax</InputGroup.Text>
                                <Form.Control disabled type="number" value={(Number(Rate) * (0.09)).toFixed(2)} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total</InputGroup.Text>
                                <Form.Control disabled type="number" value={(Number(Rate) + (Number(Rate) * 0.09)).toFixed(2)} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Grand Total</InputGroup.Text>
                                <Form.Control disabled type="number" value={((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)).toFixed(2)} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>

                    {/* ---------------------Account Section------------------------------ */}

                    <Row className="border border-2 border-warning rounded-1 mt-2">
                        <Col xs={12} className="text-center">
                            <h3>Account Section</h3>
                        </Col>
                        <Col lg={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Total Amount</InputGroup.Text>
                                <InputGroup.Text className="fw-bold bg-warning" >{((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)).toFixed(2)}</InputGroup.Text>
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Paid Amount</InputGroup.Text>
                                <InputGroup.Text className="fw-bold bg-success text-white">{PaidAmount}</InputGroup.Text>
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg={4}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Due Amount</InputGroup.Text>
                                <InputGroup.Text className="fw-bold bg-danger text-white">{(((Number(Rate) + (Number(Rate) * 0.09)) * Number(HandleStayDays)) - (Number(PaidAmount))).toFixed(2)}</InputGroup.Text>
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={12} className='bg-success pt-3'>

                            {
                                Data.account.length > 0 ? <TableDisplay res={Data.account} /> : null
                            }
                        </Col>
                        <Col lg={6} className="mt-2">
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Payment Method</InputGroup.Text>
                                <Form.Select id="SelectPaymentMethod" aria-label="Default select example" onChange={(event) => { setPaymentData({ ...PaymentData, "paymentmethod": event.target.value }) }}  >
                                    <option value="none"></option>
                                    <option value="Master Card">Master Card</option>
                                    <option value="Visa Card">Visa Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Cash">Cash</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col lg={4} className="mt-2">
                            <InputGroup className="mb-1">
                                <InputGroup.Text>Amount</InputGroup.Text>
                                <Form.Control type="number" id="PaymentAmount" onChange={(event) => { setPaymentData({ ...PaymentData, "amount": Number(event.target.value) }) }} />
                                <InputGroup.Text> $</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col lg={2} className="mt-2">
                            <Button type="button" onClick={AddPayment} className="w-100" variant="outline-success">Add</Button>
                        </Col>

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
