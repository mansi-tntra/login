import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authservice from "../services/auth.service";

const access_token = localStorage.getItem('access_token')
    ? localStorage.getItem('access_token')
    : null
console.log(access_token)
export const initialState=
    {
        loading: false,
        userInfo: null,
        access_token ,
        error:null,
        success:false
    }
export const login = createAsyncThunk("auth/login",
    async({email,password},{ rejectWithValue })=>{
    try{
        const res = await authservice.login(email,password);
        console.log("nnnnn",res);
        return res.data
    }catch(error){
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
    })

export const logout = createAsyncThunk("auth/logout", async () => {
    await authservice.logout();
});


const LoginAuthSlice  = createSlice({
    name: "login_auth",
    initialState,
    reducer:{

    },
    extraReducer: {
        [login.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [login.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.userInfo = payload
            state.access_token = payload.access_token

        },
        [login.rejected]: (state, {payload}) => {
            state.loading = false
            state.error= payload
        },
    },
})

export default LoginAuthSlice.reducer