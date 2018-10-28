import React from 'react';
import {Sign} from '../components/SignInOrSignUp/Sign';
import {NavBar} from '../components/NavBar/NavBar';
import './LoginPage.css';

export const LoginPage = () => (
    <div className="LoginPage">
        <NavBar/>
        <Sign />
    </div>
)

export default LoginPage;
