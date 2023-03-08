import { combineReducers } from "redux";
import { MainReduser, FindRooms, UsersReduser } from './Redusers'


const CombinedRedusers = combineReducers({
    MainReduser,
    FindRooms,
    UsersReduser,
})

export default CombinedRedusers;