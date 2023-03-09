import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, Button, Form, Modal } from 'react-bootstrap'
import { DatePicker, Table } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function Revenue() {
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const state = useSelector((state) => state.MainReduser)
    var now = dayjs().format('YYYY-MM-DD')
    const [StartDate, setStartDate] = useState(dayjs().endOf('day').format('YYYY-MM-DD'))
    const [EndDate, setEndDate] = useState(dayjs().endOf('day').format('YYYY-MM-DD'))
    let [RevenueList, setRevenueList] = useState([])
    let [Total, setTotal] = useState(0)
    const TotalDays = () => {
        let d1 = document.getElementById("d1").value
        let d2 = document.getElementById("d2").value
        setStartDate(d1)
        setEndDate(d2)
    }
    const columns = [
        {
            title: 'No.',
            dataIndex: 'No',
        }, {
            title: 'Date',
            dataIndex: 'Date',
        },
        {
            title: 'Room Type',
            dataIndex: 'RoomType',
        },
        {
            title: 'RoomNo',
            dataIndex: 'RoomNo',
        }
        ,
        {
            title: 'Customer',
            dataIndex: 'fname',
        }
        ,
        {
            title: 'Payment Method',
            dataIndex: 'PaymentMethod',
        },
        {
            title: 'Payment',
            dataIndex: 'Payment',
        }
    ];
    const data = [];
    const FindByDate = () => {
        Total = 0
        RevenueList = []
        if (StartDate >= EndDate) {
            setRevenueList([])
            toast.info("Start Date must be LESS THEN End Date", {
                position: "top-center",
                autoClose: 1500,
                theme: "dark",
            });
            setTotal(0)
        } else {
            let Update = {}
            for (let i of state) {
                for (let k = 0; k < i.account.length; k++) {
                    if (StartDate <= i.account[k].date && i.account[k].date <= EndDate) {
                        Update["Date"] = i.account[k].date
                        Update["RoomType"] = i.roomtype
                        Update["Payment"] = i.account[k].amount
                        Update["RoomNo"] = i.roomno
                        Update["PaymentMethod"] = i.account[k].paymentmethod
                        Update["fname"] = i.fname
                        Total = Total + i.account[k].amount + (i.account[k].amount) * 0.09
                        Total = Number(Math.round(Total + 'e2') + 'e-2')
                        // Total = parseInt(Total) + (parseInt(i.account[k].amount) + (parseInt(i.account[k].amount) * 0.09)).toFixed(2)
                        setTotal(Total)
                        RevenueList.push(Update)
                        setRevenueList(RevenueList)
                        Update = {}
                    }
                }
            }
            setShow(true)
        }
    }
    const handleDate = () => {
        setShow(false)
        RevenueList
            .sort((a, b) => a.Date > b.Date ? 1 : -1)
        setRevenueList(RevenueList)
    }
    const handleRoomType = () => {
        setShow(false)
        RevenueList
            .sort((a, b) => a.RoomType > b.RoomType ? 1 : -1)
        setRevenueList(RevenueList)
    }
    const handlePaymentMethod = () => {
        setShow(false)
        RevenueList
            .sort((a, b) => a.PaymentMethod > b.PaymentMethod ? 1 : -1)
        setRevenueList(RevenueList)
    }
    const handleRoomNo = () => {
        setShow(false)
        RevenueList
            .sort((a, b) => a.RoomNo > b.RoomNo ? 1 : -1)
        setRevenueList(RevenueList)
    }
    // RevenueList.sort(function (a, b) {
    //     if (a.Payment > b.Payment) return 1;
    //     if (a.Payment < b.Payment) return 1;
    //     return 0;
    // })
    // for (let i = 0; i < RevenueList.length; i++) {
    //     data.push({
    //         key: i,
    //         Date: RevenueList[i].Date,
    //         RoomType: RevenueList[i].RoomType,
    //         RoomNo: RevenueList[i].RoomNo,
    //         fname: RevenueList[i].fname,
    //         PaymentMethod: RevenueList[i].PaymentMethod,
    //         Payment: RevenueList[i].Payment
    //     })
    // }
    RevenueList
        .map((res, index) => {
            return (
                data.push({
                    key: index,
                    No: index + 1,
                    Date: res.Date,
                    RoomType: res.RoomType,
                    RoomNo: res.RoomNo,
                    fname: res.fname,
                    PaymentMethod: res.PaymentMethod,
                    Payment: ((res.Payment) + ((res.Payment) * 0.09)).toFixed(2)
                })
            )
        })
    return (
        <>
            <Container>
                <Row>
                    <Col lg={4}>
                        <InputGroup className="m-1">
                            <InputGroup.Text >Start Date</InputGroup.Text>
                            <InputGroup.Text >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    // disabledDate={disabledDate}
                                    defaultValue={dayjs(now).endOf('day')}
                                    id="d1"
                                    showToday={false}
                                    onChange={TotalDays}
                                />

                                {/*---------------------------- By React DatePicker----------------------- */}
                                {/* <DatePicker
                                    closeOnScroll={true}
                                    dateFormat="yyyy-MM-dd"
                                    showIcon
                                    // withPortal
                                    showYearDropdown
                                    showMonthDropdown
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormatCalendar="MMMM"
                                    // yearDropdownItemNumber={10}
                                    // scrollableYearDropdown
                                    peekNextMonth
                                    dropdownMode="select"
                                /> */}
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <InputGroup className="m-1">
                            <InputGroup.Text >End Date</InputGroup.Text>
                            <InputGroup.Text >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    // disabledDate={disabledDate}
                                    defaultValue={dayjs(now).endOf('day')}
                                    id="d2"
                                    showToday={false}
                                    onChange={TotalDays}
                                />
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col lg={4}>
                        <Button variant="outline-success" className="w-100 mt-2 mb-1" onClick={FindByDate}>Total Revenue</Button>
                    </Col>
                    <Col md={{ span: 6, offset: 6 }}>
                        <InputGroup className="m-1">
                            <InputGroup.Text >Total Revenue</InputGroup.Text>
                            <Form.Control value={Total} disabled className="bg-warning fw-bold text-danger fs-4" />
                            <InputGroup.Text >CAD $</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='bg-success pt-3' >
                        <Table columns={columns} dataSource={data} size="small" style={{ minHeight: "70vh" }} />
                    </Col>
                </Row>
            </Container>

            <Modal
                show={show}
                onHide={handleDate}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter By</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDate}>
                        Date
                    </Button>
                    <Button variant="primary" onClick={handleRoomType}>
                        Room Type
                    </Button>
                    <Button variant="primary" onClick={handlePaymentMethod}>
                        Payment Method
                    </Button>
                    <Button variant="primary" onClick={handleRoomNo}>
                        Room Number
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    )
}
