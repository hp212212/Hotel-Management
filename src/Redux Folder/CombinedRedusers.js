import { combineReducers } from "redux";
import { MainReduser } from './Redusers'


const CombinedRedusers = combineReducers({
    MainReduser,
})

export default CombinedRedusers;