import React from 'react';
import {Registration} from "../../components/SignInOrSignUp/Registration/Registration";
import {NavBar} from "../../components/NavBar/NavBar";
import './RegistrationPage.css';

export const RegistrationPage = () => (
    <div className="LoginPage">
        <NavBar/>
        <Registration />
    </div>
)

export default RegistrationPage;
