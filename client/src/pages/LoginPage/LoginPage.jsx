import React from 'react';
import {Login} from "../../components/SignInOrSignUp/Login/Login";
import {NavBar} from "../../components/NavBar/NavBar";
import './LoginPage.css';

export const LoginPage = () => (
    <div className="LoginPage">
        <NavBar/>
        <Login />
    </div>
)

export default LoginPage;
