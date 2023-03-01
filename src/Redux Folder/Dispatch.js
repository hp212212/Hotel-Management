import { Type } from "./ActionType";


export function PostDispatch(Data, AddId, Url) {
    return {
        type: Type.ADD,
        Load: Data,
        AddId: AddId,
        Url: Url
    }
}
export function PutDispatch(Data, EditId, Url) {
    return {
        type: Type.EDIT,
        Load: Data,
        EditId: EditId,
        Url: Url
    }
}

export function FindRoomsDispatch(Checkin, Checkout, RoomType) {
    return {
        type: Type.RoomFind,
        Checkin: Checkin,
        Checkout: Checkout,
        RoomType: RoomType
    }
}