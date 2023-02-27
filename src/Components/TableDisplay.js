import React, { useState } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'
import '../Css/TableDisplay.css'

export default function TableDisplay(Props) {
    let dada = Props.id
    const state = useSelector((state) => state.MainReduser)
    let Reservation = {}
    for (let i = 0; i < state.length; i++) {
        if (Number(dada) === state[i].id) {
            Reservation = state[i]
            break
        }
    }
    console.log(Reservation)
    const datepast = dayjs(Reservation.checkin)
    const datenow = dayjs(dayjs().format("YYYY-MM-DD"))
    let TotalStayDays = datenow.diff(datepast, 'day')
    // const [Reservation, setReservation] = useState(kaka)
    const columns = [
        {
            title: 'Date',
            dataIndex: 'Date',
        },
        {
            title: 'Rate Type',
            dataIndex: 'Rate_Type',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
        },
        {
            title: 'Activity',
            dataIndex: 'Activity',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
        }
    ];
    const data = [];
    for (let i = 0; i < TotalStayDays + 1; i++) {
        data.push({
            key: (i) * 2,
            Date: datepast.add(i, 'day').format('YYYY-MM-DD'),
            Rate_Type: `Room Rate`,
            Amount: Reservation.rate,
            Activity: `Regular Room Charge`,
            Status: "Success..."
        });
        data.push({
            key: ((i) * 2 + 1),
            Date: datepast.add(i, 'day').format('YYYY-MM-DD'),
            Rate_Type: `Room Rate tax`,
            Amount: ((Reservation.rate) * (0.09)).toFixed(2),
            Activity: `Regular Room Charge`,
            Status: "Success..."
        });
    }
    console.log(data)
    return (
        <>
            <Table columns={columns} dataSource={data} size="small" />
        </>
    )
}
