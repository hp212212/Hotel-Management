import React from 'react';
import { Container, Nav, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { TbDoorExit } from 'react-icons/tb';
import { ImEnter } from 'react-icons/im';
import { RiReservedFill } from 'react-icons/ri';
import { MdOutlineFamilyRestroom } from 'react-icons/md';

import { FaChrome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import "../Css/Style.css"

export default function Home() {
    let List = useSelector((state) => state.MainReduser)
    var now = dayjs().format('YYYY-MM-DD')
    const location = useLocation()
    return (
        <>
            <div style={{ height: "90vh", width: "100vw", backgroundColor: "whitesmoke" }}>
                <Container fluid="xxl" >
                    <Row >
                        <Col sm={2} className="side p-1">
                            <div className="h-50 reservations ">
                                <div className="reservationheading">
                                    Tosay's Arrivals
                                </div>
                                <div className="reservationheight px-1">
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        List.map((res, index) => {
                                            const { fname } = res;
                                            if (now === res.checkin && "Reservation" === res.status) {
                                                return (
                                                    <div className="MiddleItemsdesign">
                                                        <Nav.Link as={NavLink} to={`${location.pathname}/ReservationInhouse/${res.id}`} className="my-1 ps-1 reservationsitems" href='#'>{res.fname}</Nav.Link>
                                                    </div>
                                                )

                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className="h-50 reservations ">
                                <div className="reservationheading">
                                    Today's Departures
                                </div>
                                <div className="reservationheight px-1">
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        List.map((res, index) => {
                                            if (now === res.checkout && "In House" === res.status) {
                                                return (
                                                    <div className="MiddleItemsdesign">
                                                        <Nav.Link as={NavLink} to={`${location.pathname}/Inhouse/${res.id}`} className="my-1 ps-1 reservationsitems" href='#'>{res.fname}</Nav.Link>
                                                    </div>
                                                )

                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col md={10} className="underNabBar">
                            <div className="underNabBaricons">
                                <Nav.Link as={NavLink} to={`${location.pathname}/Walkin`}>
                                    <ImEnter className="underNabBariconsItems" title="Walk In" />
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={`${location.pathname}/Reservation`}>
                                    <RiReservedFill className="underNabBariconsItems" title="Reservation" />
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/Inhouse"}>
                                    <FaChrome className="underNabBariconsItems" />
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/Inhouse"}>
                                    <FaChrome className="underNabBariconsItems" />
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/Inhouse"}>
                                    <FaChrome className="underNabBariconsItems" />
                                </Nav.Link>
                            </div>
                            <div className="MiddlePart">
                                {
                                    // eslint-disable-next-line array-callback-return
                                    List.map((res, index) => {
                                        const { fname, roomno, staydays, roomtype, checkout, checkin,id } = res;
                                        // eslint-disable-next-line no-lone-blocks
                                        {
                                            if (now >= checkin && now <= checkout && "In House" === res.status) {
                                                return (
                                                    <div className="MiddleItemsdesign" >
                                                        <Nav.Link as={NavLink} to={`${location.pathname}/Inhouse/${id}`} className="MiddleItems" title={fname}>
                                                            <div className="MiddleItems1">
                                                                <BsFillPersonCheckFill className="MiddleItems11" title={`In House`} />
                                                                <div className="MiddleItems12" key={roomno} title={`${roomno}`}>
                                                                    {roomno}
                                                                </div>
                                                                <div className="MiddleItems13" key={fname} title={`In Person`}>
                                                                    {fname}
                                                                </div>
                                                            </div>
                                                            <div className="MiddleItems2">
                                                                <div className="MiddleItems21">
                                                                    <div key={staydays} title={`${staydays} Days To Go`}>{staydays} Days</div>
                                                                    <div key={roomtype} title={`Room Type`}>{roomtype}</div>
                                                                </div>
                                                                <div className="MiddleItems22"><MdOutlineFamilyRestroom className="FamilyIcon"/>
                                                                </div>
                                                                <div className="MiddleItems23"  >
                                                                    <TbDoorExit key={checkout} style={{ color: "red" }} className="me-1" title={`Check Out Date`} />
                                                                    <div title={`Check Out Date`}>{checkout}</div>
                                                                </div>
                                                            </div>
                                                        </Nav.Link>
                                                    </div>
                                                )
                                            }
                                        }

                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
