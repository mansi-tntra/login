import React, {useRef, useState} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import 'antd/dist/antd.min.css'
import styled from "styled-components";
import {Navigate, useNavigate} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import Error from "../Error/ErrorComponent";
import {login} from "./action/auth";
const StyleLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  
`
const WapperLogin = styled.div`
  position: absolute;
  margin:10%;
  width: 30em ;
  height: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow:5px 5px 15px -3px; 
  border-radius: 0.9rem
  `
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;

  .ant-btn-primary:focus, .ant-btn-primary:hover {
    color: #fff;
    border-color: black;
    background: #f82d33;
  } 

`
const ButtonBox = styled(Button)`
  width: 100%;
  background-color: #2d2c2c;
  color: white;
  border-color: black;
  border-radius: .2rem;
`
const LoginTextDiv = styled.div`
    display: flex;
   
`

const LoginText = styled.h1`
    font-weight: bolder;  
  
`
const LoginForm =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.auth);
    console.log(message)
    const handleLogin =()=>{
        console.log(email ,password)
        setLoading(true);
        dispatch(login(email, password))
            .then(() => {
                navigate("/home");

            })
            .catch(() => {
                setLoading(false);
            });
    }
    const routeButton = () =>{
        navigate("/register");
    }
    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }
    return(
        <StyleLogin>
            <WapperLogin>
                <LoginTextDiv>
                    <LoginText>Login</LoginText>
                </LoginTextDiv>
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={()=>handleLogin()}
                >
                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input your Email'
                            },
                            {
                                type:'email',
                                message: 'Please Enter valid Email',
                            }
                        ]}
                    ><Input value={email} placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password'
                            },

                        ]}
                    ><Input.Password  value={password} placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item >
                        <ButtonDiv>
                            <ButtonBox type="primary"  htmlType="submit" >
                                Log in
                            </ButtonBox>
                        </ButtonDiv>
                    </Form.Item>
                </Form>

                <div>
                    <p>Don't have an account? <a onClick={()=>routeButton()}>Create an account</a></p>
                </div>
                {message && <Error>{message}</Error>}
            </WapperLogin>
        </StyleLogin>
    )

}
export default LoginForm