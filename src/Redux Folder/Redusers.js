import { PostMainDataApi, PutMainDataApi } from "../Server/Services";
import { Type } from "./ActionType";
import { defultMainDataApiData } from "./InitialState";


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
            console.log(state)
            return state
        default:
            return state;
    }
}