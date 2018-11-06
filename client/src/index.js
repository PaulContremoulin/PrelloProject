import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Router, Route } from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';

import { history } from './history';
//Pages
import LoginPage from './pages/LoginPage/LoginPage';
import {HomePage} from './pages/HomePage/HomePage';
import {AccountPage} from './pages/AccountPage/AccountPage';
import {ChangePswd} from "./components/SignInOrSignUp/ChangePswd/ChangePswd";
import {BoardPage} from './pages/BoardPage/BoardPage';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/account" component={AccountPage}/>
                <Route path='/login/reset/:idmembre/password' component={ChangePswd}/>
                <Route path="/board" component={BoardPage}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
