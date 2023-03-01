import { combineReducers } from "redux";
import { MainReduser, FindRooms } from './Redusers'


const CombinedRedusers = combineReducers({
    MainReduser,
    FindRooms,
})

export default CombinedRedusers;