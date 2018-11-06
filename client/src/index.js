import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';

import { history } from './history';
//Pages
import {MainPage} from "./pages/MainPage/MainPage";
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPswdPage from "./pages/ResetPswdPage/ResetPswdPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import {HomePage} from './pages/HomePage/HomePage';
import {AccountPage} from './pages/AccountPage/AccountPage';
import {ChangePswd} from "./components/SignInOrSignUp/ChangePswd/ChangePswd";
import {BoardPage} from './pages/BoardPage/BoardPage';

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
            <div className="index">
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/registration" component={RegistrationPage}/>
                <Route exact path="/reset/password" component={ResetPswdPage}/>
                <Route exact path="/home" component={HomePage}/>
                <Route exact path="/account" component={AccountPage}/>
                <Route exact path="/login/reset/:idmembre/password" component={ChangePswd}/>
                <Route exact path="/board" component={BoardPage}/>
            </div>
        </Router>
      </PersistGate>
    </Provider>
    , document.getElementById('root'));
