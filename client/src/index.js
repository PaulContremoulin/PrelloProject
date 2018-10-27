import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { store } from "./js/redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'react-bootstrap/dist/react-bootstrap.min';

import App from './js/App';

import LoginPage from './js/pages/LoginPage';

dotenv.config({ path: '../environments/.env'});

ReactDOM.render(
    <Provider store={store}>
        <LoginPage />
    </Provider>
    , document.getElementById('root'));
