import {configureStore} from "@reduxjs/toolkit";
import LoginAuthSlice from "../src/Login/reducer"

const store = configureStore({
    reducer:{
     user: LoginAuthSlice,
    }
})

export default store