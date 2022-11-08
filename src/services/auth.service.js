import axios from "axios";

const API_URL = "http://206.189.130.104/api/v1/"
const register = (name, email, password) => {
    return axios.post(API_URL +"sign_up", {
        name,
        email,
        password,
    });
};
const login =(email,password)=>{
    return axios
        .post(API_URL+"users/sign_in",{
            user: {
                email: email,
                password: password,
            },
        },{
            headers: {
                "Content-Type": "application/json"
            }
    }).then((response) => {

            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            console.log(response.data.user)
            console.log(response.data.message)
            return response.data;
        });

};
const logout = () => {
    localStorage.removeItem("user");
};
const authService={
    register,
    login,
    logout
}
export default authService