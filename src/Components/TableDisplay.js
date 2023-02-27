import React, { useState } from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'
import '../Css/TableDisplay.css'

export default function TableDisplay(Props) {
    let Dataaa = Props.res
    // const state = useSelector((state) => state.MainReduser)
    // let Reservation = {}
    // for (let i = 0; i < state.length; i++) {
    //     if (Number(dada) === state[i].id) {
    //         Reservation = state[i]
    //         break
    //     }
    // }
    // console.log(Reservation)
    // const datepast = dayjs(Reservation.checkin)
    // const datenow = dayjs(dayjs().format("YYYY-MM-DD"))
    // let TotalStayDays = datenow.diff(datepast, 'day')
    // // const [Reservation, setReservation] = useState(kaka)
    const columns = [
        {
            title: 'Date',
            dataIndex: 'Date',
        },
        {
            title: 'Payment Method',
            dataIndex: 'Payment_Method',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
        }
    ];
    const data = [];
    for (let i = 0; i < Dataaa.length; i++) {
        data.push({
            key: i,
            Date: Dataaa[i].date,
            Payment_Method: Dataaa[i].paymentmethod,
            Amount: `${Dataaa[i].amount} $`,
            Status: "Success..."
        })
    }
    return (
        <>
            <Table columns={columns} dataSource={data} size="small" />
        </>
    )
}
