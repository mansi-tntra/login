import axios from "axios";

const API_URL = "https://bc85-144-48-250-250.in.ngrok.io/api/v1/login"

const login =(email,password)=>{
    return axios
        .post(API_URL,{
                email,
                password
        },{
            headers: {
                "Content-Type": "application/json"
            }
    }) .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
})
};
const logout = () => {
    localStorage.removeItem("user");
};
const authService={
    login,
    logout
}
export default authService