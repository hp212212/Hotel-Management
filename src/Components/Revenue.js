import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, Button } from 'react-bootstrap'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

export default function Revenue() {
    const state = useSelector((state) => state.MainReduser)
    var now = dayjs().format('YYYY-MM-DD')
    const [StartDate, setStartDate] = useState(dayjs().endOf('day').format('YYYY-MM-DD'))
    const [EndDate, setEndDate] = useState(dayjs().endOf('day').format('YYYY-MM-DD'))
    const disabledDate = (current) => {
        return (current) && (current) > dayjs().endOf('day');
    };
    const TotalDays = () => {
        let d1 = document.getElementById("d1").value
        let d2 = document.getElementById("d2").value
        setStartDate(d1)
        setEndDate(d2)
    }
    const FinalSubmit = () => {
        if (StartDate >= EndDate) {
            alert("Start Date must be LESS THEN End Date")
        }else{
            console.log(state)
        }
    }
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
                                    disabledDate={disabledDate}
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
                                    disabledDate={disabledDate}
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

                    </Col>
                </Row>
            </Container>


        </>
    )
}
