import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';

import history from './history';
//Pages
import LoginPage from './pages/LoginPage/LoginPage';
import {HomePage} from './pages/HomePage/HomePage';

dotenv.config({ path: '../environments/.env'});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/home" component={HomePage}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
