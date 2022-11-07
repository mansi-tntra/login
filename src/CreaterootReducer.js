import {combineReducers} from "@reduxjs/toolkit";
import LoginAuthSlice from "../src/Login/reducer"

export default function createReducer(injectedReducer = {}) {
    const rootReducer = combineReducers({
        ...injectedReducer,
        LoginAuthSlice


    });

    return rootReducer;
}
