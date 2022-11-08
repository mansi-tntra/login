import {useState} from "react";
import React from 'react'
import { Form, Input } from 'antd';
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, useActionData, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {register} from "../LoginPage/action/auth";
import Error from "../Error/ErrorComponent";


const SignUpForm = styled.div`
  background-color: white; padding:4rem; width:30rem; height:35rem; box-shadow:1rem 1rem 2rem -1rem; border-radius:1rem; margin:3rem; margin-left: 24rem`;

const Button = styled.button `width: 22rem; height: 2rem; background-color: black; color:white; border-radius: 0.2rem; &:hover { background-color: red; }`
 const SignUpHeading = styled.div`display:flex; justify-content:center`;

 const SignUpButton = styled.div`display:flex; justify-content:center`;
const SignUpFooter = styled.div`display:flex; justify-content:center`;

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const HandleSubmit = () => {
        setSuccessful(false);
        console.log(name, email, password);
        dispatch(register(name, email, password))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
// navigate("/login")
    }

    const routeButton = () =>{
        navigate("/login");
    }

    return (
        <>
                <SignUpForm>
                    <SignUpHeading>
                        <h1>Create new account</h1>
                    </SignUpHeading>
                    <Form
                        onFinish={() => HandleSubmit()}
                        layout='vertical'
                    >
                        {!successful && (
                            <div>
                                <Form.Item
                                    label="Name : "
                                    name="Name"
                                    rules={[{
                                        required: true,
                                        message: 'Please input your Name!'
                                    },
                                        { min: 3 }, { max: 15 },
                                        {
                                            pattern: /^[a-zA-Z]+$/,
                                            message: 'Name can only include letters.',
                                        },
                                    ]}
                                >
                                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your name' />
                                </Form.Item>

                                <Form.Item
                                    label="Email : "
                                    name="Email"
                                    rules={[{
                                        required: true,
                                        message: 'Please input your Email',
                                    },
                                        {
                                            pattern: /\S+@\S+\.\S+/,
                                            message: 'please enter valid email.',
                                        },
                                    ]}
                                >
                                    <Input placeholder='enter your Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Item>


                                <Form.Item
                                    label="Password : "
                                    name="Password"
                                    rules={[{
                                        required: true,
                                        message: 'Please input your Password',
                                    },
                                        {
                                            pattern: /[a-zA-Z0-9]/,
                                            message: 'please enter valid Password.',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder='enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Item>

                                <Form.Item >
                                    <SignUpButton>
                                        <Button type="primary" htmlType="submit">
                                            SignUp
                                        </Button>
                                    </SignUpButton>
                                </Form.Item>

                            </div>
                        )}

                    </Form>

                    <SignUpFooter>
                        <p>Already an account?  <a onClick={()=>routeButton()}>Login</a></p>
                    </SignUpFooter>
                    {message && <Error>{message}</Error>}
                </SignUpForm>
        </>
    )
}

export default SignUp;