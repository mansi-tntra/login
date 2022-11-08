import Login from "./Login";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Home from "./Home ";


export const routeConfig=[
    {
        path:'/login',
        exact:true,
        component:<LoginPage/>
    },
    {
        path:'/register',
        exact:true,
        component:<RegisterPage/>
    },
    {
        path:'/home',
        exact: true,
        component:<Home/>
    }
]

