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
import LoginPage from './pages/LoginPage/LoginPage';
import {HomePage} from './pages/HomePage/HomePage';
import {AccountPage} from './pages/AccountPage/AccountPage';
import {ChangePswd} from "./components/SignInOrSignUp/ChangePswd/ChangePswd";
import {BoardPage} from './pages/BoardPage/BoardPage';

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
            <div>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/account" component={AccountPage}/>
                <Route path='/login/reset/:idmembre/password' component={ChangePswd}/>
                <Route path="/board" component={BoardPage}/>
            </div>
        </Router>
      </PersistGate>
    </Provider>
    , document.getElementById('root'));
