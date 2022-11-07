import React, {useState} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import 'antd/dist/antd.min.css'
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {selectError, selectLoading, selectUserInfo, selectUserToken} from "./selector";
import {login} from "./reducer";
import {connect, useDispatch} from "react-redux";
import Error from "../Error/ErrorComponent";
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
const LoginForm =({ loading, error,userInfo})=>{
    const dispatch = useDispatch();
    // const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin =()=>{
        // setLoading(true)
        console.log(email ,password)
        console.log("Login ")
        dispatch(login({email,password}))
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
                            {
                                pattern: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/,
                                message: 'Please Enter Strong Password',
                            }
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
                {error && <Error>{error}</Error>}
                <div>
                    <p>Don't have an account? <a>Create an account</a></p>
                </div>
            </WapperLogin>
        </StyleLogin>
    )

}
const mapStateToProps =state=> {
    return{
        loading: selectLoading(state),
        error: selectError(state),
        userInfo: selectUserInfo(state),
        userToken: selectUserToken(state)
    }
}
export function mapDispatchToProps(dispatch) {
    return{
        loginAuth: ({data})=>{
            dispatch(login(data))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)