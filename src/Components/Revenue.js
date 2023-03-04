import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { DatePicker, Table } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

export default function Revenue() {
    const state = useSelector((state) => state.MainReduser)
    var now = dayjs().format('YYYY-MM-DD')
    const [StartDate, setStartDate] = useState(dayjs().endOf('day').format('YYYY-MM-DD'))
    const [EndDate, setEndDate] = useState(dayjs().endOf('day').format('YYYY-MM-DD'))
    let [RevenueList, setRevenueList] = useState([])
    let Total = 0
    // const disabledDate = (current) => {
    //     return (current) && (current) > dayjs().endOf('day');
    // };
    const TotalDays = () => {
        let d1 = document.getElementById("d1").value
        let d2 = document.getElementById("d2").value
        setStartDate(d1)
        setEndDate(d2)
    }
    const FinalSubmit = () => {
        Total = 0
        RevenueList = []
        if (StartDate >= EndDate) {
            setRevenueList([])
            alert("Start Date must be LESS THEN End Date")
        } else {
            // const date1 = dayjs(StartDate)
            // const date2 = dayjs(EndDate)
            // let TotalDays = date2.diff(date1, 'day')
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
                        Total = parseInt(Total) + (parseInt(i.account[k].amount) + (parseInt(i.account[k].amount) * 0.09)).toFixed(2)
                        console.log(Total)
                        RevenueList.push(Update)
                        setRevenueList(RevenueList)
                        Update = {}
                    }
                }
            }
        }
    }
    const columns = [
        {
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
    // RevenueList.sort(function (a, b) {
    //     if (a.Payment > b.Payment) return 1;
    //     if (a.Payment < b.Payment) return 1;
    //     return 0;
    // })
    console.log(RevenueList)
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
        .sort((a, b) => a.Date > b.Date ? 1 : -1)
        .map((res, index) => {
            return (
                data.push({
                    key: index,
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
                        <InputGroup className="m-2">
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
                        <InputGroup className="m-2">
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
                        <Button variant="outline-success" className="w-100 mt-2 mb-2" onClick={FinalSubmit}>Success</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='bg-success pt-3'>
                        <Table columns={columns} dataSource={data} size="small" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
