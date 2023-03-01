import React, { useState } from 'react'
import '../Css/Extra.css'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { GetRoomList } from '../Server/Services';
import { FindRoomsDispatch } from '../Redux Folder/Dispatch';

export default function Extra() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.MainReduser)
  const hfd8vsdhfuisf = useSelector((state) => state.FindRooms)
  const RoomList = GetRoomList()
  // const RoomList = []
  let kaka = [1, 2, 3, 4, 5]
  const [FinalRooms, setFinalRooms] = useState([100, 101])
  const hahahaah = () => {
    let Rooms = []
    for (let i of RoomList) {
      if (document.getElementById("Room").value === i.type) {
        Rooms = i.rooms
      }
    }
    const date1 = dayjs(dayjs(document.getElementById("d1").value).format('YYYY-MM-DD'))
    const date2 = dayjs(dayjs(document.getElementById("d2").value).format('YYYY-MM-DD'))
    const Room = document.getElementById("Room").value
    let TotalDays = date2.diff(date1, 'day')
    let CheckDay = ''
    for (let j of state) {
      if ((j.status === "Reservation" || j.status === "In House") && j.roomtype === Room) {
        for (let i = 0; i < TotalDays; i++) {
          CheckDay = date1.add(i, 'day').format('YYYY-MM-DD')
          if (CheckDay >= j.checkin && CheckDay < j.checkout) {
            for (let k = 0; k < Rooms.length; k++) {
              if (Rooms[k] === j.roomno) {
                Rooms.splice(k, 1)
              }
            }
            setFinalRooms(Rooms)
            break
          }
        }
      }
    }
  }
  const tatatatatatatata = () => {
    dispatch(FindRoomsDispatch("2023-03-01", "2023-03-03", "NK1"))
  }
  return (
    <>
      <div className='Main'> Jay Swaminarayan</div>
      <input id="d1" placeholder='Date - 1' />
      <input id="d2" placeholder='Date - 2' />
      <input id="Room" placeholder='Room Type' />

      <button className='buttonn' onClick={tatatatatatatata}>Slide</button>

      {
        hfd8vsdhfuisf.map((res, index) => {
          return (
            <>
              <li>{res}</li>
            </>
          )
        })
      }

    </>
  )
}
