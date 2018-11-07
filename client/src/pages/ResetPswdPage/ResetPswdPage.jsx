import React from 'react';
import {NavBar} from "../../components/NavBar/NavBar";
import {ResetPswd} from '../../components/SignInOrSignUp/ResetPswd/ResetPswd';
import './ResetPswdPage.css';

export const ResetPswdPage = () => (
    <div className="ResetPswdPage">
        <NavBar/>
        <ResetPswd/>
    </div>
)

export default ResetPswdPage;