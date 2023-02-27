import React from 'react'
import { Table } from 'antd';
import '../Css/TableDisplay.css'

export default function TableDisplay() {
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
    for (let i = 0; i < 5; i++) {
        data.push({
            key: i,
            Date: `Edward King ${i}`,
            Rate_Type: 32,
            Amount: `London, Park Lane no. ${i}`,
            Activity: `Large${i}`,
            Status: "Success...",
            rowSpan: 2,
        });
    }
    return (
        <>
            <Table columns={columns} dataSource={data} size="small"/>
        </>
    )
}
