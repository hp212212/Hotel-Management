import React from 'react'
import { Table } from 'antd';
import '../Css/TableDisplay.css'

export default function TableDisplay(Props) {
    let Dataaa = Props.res
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
