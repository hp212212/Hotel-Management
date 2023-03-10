// import { useSelector } from "react-redux";
import { GetMainDataApi, GetRoomList, PostMainDataApi, PutMainDataApi, PostUsers } from "../Server/Services";
import { Type } from "./ActionType";
import { defultMainDataApiData, defultRooms, defultUsers } from "./InitialState";
import dayjs from 'dayjs'


export function MainReduser(state = defultMainDataApiData, action) {
    switch (action.type) {
        case Type.ADD:
            PostMainDataApi(action.Load, action.Url);
            action.Load = { ...action.Load, "id": action.AddId };
            return [...state, action.Load];

        case Type.EDIT:
            PutMainDataApi(action.Load, action.Url, action.EditId);
            for (let i = 0; i < state.length; i++) {
                if (action.EditId === state[i].id) {
                    state.splice(i, 1, action.Load)
                }
            }
            return state
        default:
            return state;
    }
}
export function FindRooms(state = defultRooms, action) {
    const kaka = GetMainDataApi()
    const RoomList = GetRoomList()
    // const RoomList = []
    switch (action.type) {
        case Type.RoomFind:
            let Rooms = ""
            for (let i of RoomList) {
                if (action.RoomType === i.type) {
                    Rooms = i.rooms
                }
            }
            const date1 = dayjs(action.Checkin)
            const date2 = dayjs(action.Checkout)
            let TotalDays = date2.diff(date1, 'day')
            let CheckDay = ''
            state = Rooms
            for (let j of kaka) {
                if ((j.status === "Reservation" || j.status === "In House") && j.roomtype === action.RoomType) {
                    for (let i = 0; i < TotalDays; i++) {
                        CheckDay = date1.add(i, 'day').format('YYYY-MM-DD')
                        if (CheckDay >= j.checkin && CheckDay < j.checkout) {
                            for (let k = 0; k < Rooms.length; k++) {
                                if (Rooms[k] === j.roomno && Rooms[k] !== action.SelectedRoom) {
                                    Rooms.splice(k, 1)
                                }
                            }
                            state = Rooms
                            break
                        }
                    }
                }
                else {
                    state = Rooms
                }
            }
            return state;
        default:
            return state;
    }
}
export function UsersReduser(state = defultUsers, action) {
    switch (action.type) {
        case Type.UserAdd:
            PostUsers(action.Load, action.Url);
            action.Load = { ...action.Load, "id": action.AddId };
            return [...state, action.Load];

        default:
            return state;
    }
}