import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authservice from "../services/auth.service";
import axios from "axios";

const access_token = localStorage.getItem('access_token')
    ? localStorage.getItem('access_token')
    : null
console.log(access_token)
export const initialState=
    {
        loading: false,
        userInfo: null,
        access_token ,
        message:"",
        success:false,
        error:null
    }
export const login = createAsyncThunk("user/login",
    async({email,password},{ rejectWithValue })=>{
     const res = await axios.post("https://04eb-203-88-144-98.in.ngrok.io/api/v1/login")
         .then((response)=>{
         console.log(response)
         console.log(response.data.error)
     }).catch((error)=>{
         console.log("error",error)
     })
        return res.data
    })




const LoginAuthSlice  = createSlice({
    name: "login_auth",
    initialState,
    reducers:{
        addToken: (state,action)=> {
            state.access_token = localStorage.getItem("access_token")
        },
        adduser: (state,action)=> {
            state.userInfo = localStorage.getItem("user")
        },
        logOut: (state,action)=> {
            state.access_token = null
            localStorage.clear();
        },

    },
    extraReducer: {
        [login.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [login.fulfilled]: (state, {payload:{error,message,access_token,user}}) => {
            state.loading = false
            state.message = message
            // if(error){
            //     state.error = error
            // }else{
            //     state.message=msg;
            //     state.userInfo=user;
            //     state.userToken=access_token
            //     localStorage.setItem("msg",msg)
            //     localStorage.setItem("user",user)
            //     localStorage.setItem("token",access_token)
            // }
        },
        [login.rejected]: (state, {payload}) => {
            state.loading = false
            state.message= payload
            state.error=payload
        },
    },
})
export  const { logout,adduser,addToken } = LoginAuthSlice.actions
export default LoginAuthSlice.reducer