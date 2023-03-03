import React, { useState } from 'react';
import { Container, Row, Col, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Css/Style.css'
import '../Css/Inhouse.css'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { GetRoomList } from '../Server/Services';
import { useDispatch, useSelector } from 'react-redux';
import { FindRoomsDispatch, PutDispatch } from '../Redux Folder/Dispatch';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import TableDisplay from './TableDisplay';
// import moment from 'moment';

export default function ReservationInhouse() {
    var now = dayjs().format('YYYY-MM-DD')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const kaka = useSelector((state) => state.MainReduser)
    let kakaid = {}
    const { id } = useParams()
    for (let i = 0; i < kaka.length; i++) {
        if (Number(id) === kaka[i].id) {
            kakaid = kaka[i]
            break
        }
    }
    const [Reservation, setReservation] = useState(kakaid)
    let EarlyPaidAmount = 0
    for (let i = 0; i < Reservation.account.length; i++) {
        EarlyPaidAmount = EarlyPaidAmount + Number(Reservation.account[i].amount)
    }
    const AvailableRooms = useSelector((state) => state.FindRooms)
    const [CheckIn, setCheckIn] = useState(Reservation.checkin)
    const [CheckOut, setCheckOut] = useState(Reservation.checkout)
    const [ReservedRoom, setReservedRoom] = useState(Reservation.roomno)
    // alert(ReservedRoom)
    // const RoomList = []
    const RoomList = GetRoomList()
    const [PaidAmount, setPaidAmount] = useState(EarlyPaidAmount)
    const [PaymentData, setPaymentData] = useState({})
    let ggg = ''
    for (let i = 0; i < RoomList.length; i++) {
        if (Reservation.roomtype === RoomList[i].type) {
            ggg = i
        }
    }
    const [RoomNoFlex1, setRoomNoFlex1] = useState("")
    const [RoomNoFlex2, setRoomNoFlex2] = useState("d-none")
    const [RateEditBtn, setRateEditBtn] = useState("")
    const ChangeRoomNoFlex = () => {
        dispatch(FindRoomsDispatch(CheckIn, CheckOut, Reservation.roomtype, ReservedRoom))
        setRoomNoFlex1("d-none")
        setRoomNoFlex2("")
        for (let i = 0; i < AvailableRooms.length; i++) {
            if (ReservedRoom === AvailableRooms[i]) {
                document.getElementById("RoomNoInput").selectedIndex = i + 1
            }
        }
    }
    const ChangeRoomRateFlex = () => {
        setRateEditBtn("d-none")
        document.getElementById("RoomRateChangeEnable").disabled = false;
    }
    const [SeltdRomTy, setSeltdRomTy] = useState(RoomList[Number(ggg)])
    const [HandleStayDays, setHandleStayDays] = useState(Reservation.staydays);
    const [Rate, setRate] = useState(Number(Reservation.rate))
    const disabledDate2 = (current) => {
        return (current) && (current) < dayjs().endOf('day');
    };
    const TotalDays = () => {
        var d1 = document.getElementById("d1").value
        var d2 = document.getElementById("d2").value
        const dateOne = new Date(d1)
        const dateTwo = new Date(d2)
        const diff = Math.abs(dateTwo - dateOne)
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        setCheckIn(d1)
        setCheckOut(d2)
        setHandleStayDays(days)
        setReservation({ ...Reservation, "checkin": d1, "checkout": d2, "staydays": days })
        dispatch(FindRoomsDispatch(d1, d2, Reservation.roomtype, ReservedRoom))
    }
    const SelectRoomRate = (event) => {
        if (event.target.value !== "Select Room") {
            setReservation({ ...Reservation, "roomno": Number(event.target.value) })
            // setReservedRoom(Number(event.target.value))
        }
    }
    // (event) => { setReservation({ ...Reservation, "status": event.target.value }) }
    const AddPayment = () => {
        if (PaymentData.paymentmethod === "none" || PaymentData.amount === 0 || Object.keys(PaymentData).length === 0) {
            alert("please Add valid Paymint.")
            document.getElementById("SelectPaymentMethod").selectedIndex = 0
            document.getElementById("PaymentAmount").value = ''
        } else {
            // setPaymentData({ ...PaymentData, "date": now })
            PaymentData["date"] = now
            setPaidAmount((Number(PaidAmount) + Number(PaymentData.amount)).toFixed(2))
            Reservation.account.push(PaymentData)
            setPaymentData({})
            document.getElementById("SelectPaymentMethod").selectedIndex = 0
            document.getElementById("PaymentAmount").value = ''
        }
    }
    const FinalSubmit = (event) => {
        event.preventDefault()
        if (HandleStayDays === 0) {
            alert("Please Some Days")
        } else {
            let EditId = Reservation.id;
            dispatch(PutDispatch(Reservation, EditId, "MainDataApi"))
            // document.getElementById("MainForm").reset()
            navigate("/Home")
        }
    }
    return (
        <>
            <Container className="my-2">
                <Form onSubmit={FinalSubmit} id="MainForm">


                    {/* ------------------------Personal Detail------------------------- */}

                    <Row className="border border-2 border-warning rounded-1">
                        <Col xs={12} className="text-center">
                            <h3>Personal Detail</h3>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-1">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control className="iinput" required type="text" value={Reservation.fname} placeholder="Enter Name" onChange={(event) => { setReservation({ ...Reservation, "fname": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control className="iinput" required type="text" placeholder="Enter Address" value={Reservation.address} onChange={(event) => { setReservation({ ...Reservation, "address": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="iinput" required type="email" placeholder="Enter email" value={Reservation.email} onChange={(event) => { setReservation({ ...Reservation, "email": event.target.value }) }} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-1">
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control className="iinput" required type="number" placeholder="Mo. Number" value={Reservation.telephone} id="number" onChange={(event) => { setReservation({ ...Reservation, "telephone": event.target.value }) }} />
                            </Form.Group>
                        </Col>
                    </Row>


                    {/* ------------------------Hotel Inventary------------------------- */}

                    <Row className="border border-2 border-warning rounded-1 mt-2">
                        <Col xs={12} className="text-center">
                            <h3>Hotel Inventary</h3>
                        </Col>
                        <Col xs={12}>
                            <InputGroup className="mb-1 w-25">
                                <InputGroup.Text>Status</InputGroup.Text>
                                <Form.Select id="SelectStatus" onChange={(event) => { setReservation({ ...Reservation, "status": event.target.value }) }}>
                                    return <option value="Reservation">Reservation</option>
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
                                    defaultValue={dayjs(Reservation.checkin)}
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
                                    defaultValue={dayjs(Reservation.checkout).endOf('day')}
                                    id="d2"
                                    onChange={TotalDays}
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
                                <Form.Control type="number" id="TotalAdults" disabled value={Reservation.adults} />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total Children</InputGroup.Text>
                                <Form.Control type="number" id="TotalChild" disabled value={Reservation.childs} />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Total Persons</InputGroup.Text>
                                <Form.Control type="number" disabled value={Number(Reservation.adults) + Number(Reservation.childs)} />
                            </InputGroup>
                        </Col>

                        <Col md={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Room Type</InputGroup.Text>
                                <Form.Control type="text" disabled value={Reservation.roomtype} />
                            </InputGroup>
                        </Col>
                        <Col md={6}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Facility</InputGroup.Text>
                                <Form.Control as="textarea" disabled value={Reservation.roomfacility} className="Facility" />
                            </InputGroup>
                        </Col>
                        <Col md={3}>
                            <InputGroup className={`mb-1 ${RoomNoFlex1}`}>
                                <InputGroup.Text>Room</InputGroup.Text>
                                <Form.Control type="text" disabled value={Reservation.roomno} />
                                <InputGroup.Text ><FaEdit type='button' title="Edit" onClick={ChangeRoomNoFlex} /></InputGroup.Text>
                            </InputGroup>
                            <InputGroup className={`mb-1 ${RoomNoFlex2}`} >
                                <InputGroup.Text>Room</InputGroup.Text>
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

                        <Col md={3}>
                            <InputGroup className="mb-1" >
                                <InputGroup.Text>Room Rate</InputGroup.Text>
                                <Form.Control type="number" id="RoomRateChangeEnable" required value={Rate || ""} disabled={true} onChange={(event) => { setRate(Number(event.target.value)); setReservation({ ...Reservation, "rate": Number(event.target.value) }) }} />
                                <InputGroup.Text>$</InputGroup.Text>
                                <InputGroup.Text className={RateEditBtn}><FaEdit type='button' title="Edit" onClick={ChangeRoomRateFlex} /></InputGroup.Text>
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


                    {/* ------------------------Account Section------------------------- */}

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
                                Reservation.account.length > 0 ? <TableDisplay res={Reservation.account} /> : null
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
        </>
    )
}
