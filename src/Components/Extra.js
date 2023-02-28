import React from 'react'
import '../Css/Extra.css'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
// import relativeTime from 'dayjs/plugin/relativeTime'
import { GetRoomList } from '../Server/Services';

// var relativeTime = require('dayjs/plugin/relativeTime')
// dayjs.extend(relativeTime)
export default function Extra() {
  const state = useSelector((state) => state.MainReduser)
  const RoomList = GetRoomList()
  // const state = useSelector((state) => state.MainReduser)
  // var now = dayjs().format('YYYY-MM-DD')
  // const aaa = state[0].checkin
  // const date1 = dayjs('2019-01-25')
  // const date2 = dayjs('2018-06-05')
  // const date1 = dayjs(dayjs().format('YYYY-MM-DD'))
  // const date2 = dayjs(state[0].checkin)
  // let TotalDays = date1.diff(date2, 'day')
  // for (let i = 0; i < TotalDays + 1; i++) {
  //   console.log(date2.add(i, 'day').format('YYYY-MM-DD'))
  // }
  // console.log(now.diff(aaa, 'day'))
  // const b = a.add(7, 'day').format('YYYY-MM-DD')
  let kaka = [1, 2, 3, 4, 5]
  const hahahaah = () => {
    let Rooms = []
    for (let i of RoomList) {
      if (document.getElementById("Room").value === i.type) {
        Rooms = i.rooms
      }
    }
    console.log(Rooms)
    const date1 = dayjs(dayjs(document.getElementById("d1").value).format('YYYY-MM-DD'))
    const date2 = dayjs(dayjs(document.getElementById("d2").value).format('YYYY-MM-DD'))
    const Room = document.getElementById("Room").value
    let TotalDays = date2.diff(date1, 'day')
    let CheckDay = ''
    let DeleteRooms = []
    for (let j of state) {
      if ((j.status === "Reservation" || j.status === "In House") && j.roomtype === Room) {
        for (let i = 0; i < TotalDays; i++) {
          CheckDay = date1.add(i, 'day').format('YYYY-MM-DD')
          if (CheckDay >= j.checkin && CheckDay < j.checkout) {
            DeleteRooms.push(j.roomno)
            Rooms.splice(Rooms.indexOf(j.roomno), 1)
            // alert(j.roomno)
          }
        }
      }
    }
    console.log(Rooms)
    console.log(DeleteRooms)
  }


  return (
    <>
      <div className='Main'> Jay Swaminarayan</div>
      <input id="d1" placeholder='Date - 1' />
      <input id="d2" placeholder='Date - 2' />
      <input id="Room" placeholder='Room Type' />

      <button className='buttonn' onClick={hahahaah}>Slide</button>


    </>
  )
}
