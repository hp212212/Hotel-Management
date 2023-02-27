import React from 'react'
import '../Css/Extra.css'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import relativeTime from 'dayjs/plugin/relativeTime'
// var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default function Extra() {
  const state = useSelector((state) => state.MainReduser)
  // var now = dayjs().format('YYYY-MM-DD')
  // const aaa = state[0].checkin
  // const date1 = dayjs('2019-01-25')
  // const date2 = dayjs('2018-06-05')
  const date1 = dayjs(dayjs().format('YYYY-MM-DD'))
  const date2 = dayjs(state[0].checkin)
  let TotalDays = date1.diff(date2, 'day')
  for (let i = 0; i < TotalDays + 1; i++) {
    console.log(date2.add(i, 'day').format('YYYY-MM-DD'))
  }
  // console.log(now.diff(aaa, 'day'))
  // const b = a.add(7, 'day').format('YYYY-MM-DD')


  return (
    <>
      <div className='Main'> Jay Swaminarayan</div>
      <button className='buttonn'>Slide</button>


    </>
  )
}
