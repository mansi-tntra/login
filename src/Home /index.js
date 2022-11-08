import {Button} from "antd";
import {logout} from "../Login/reducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import Error from "../Error/ErrorComponent";
import React from "react";

 const Home = ()=>{
     const { message } = useSelector(state => state.auth);
    return(
      <>
          <h1> Home page </h1>
          {message && <Error>{message}</Error>}
      </>

    )
}
export default Home