import React from 'react';
import {Login} from '../components/Login/Login';
import {NavBar} from '../components/NavBar/NavBar';
import App from "../App";
import './LoginPage.css';

export const LoginPage = () => (
    <div className="LoginPage">
        <NavBar/>
        <Login />
    </div>
)

export default LoginPage;