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
import HomePage from './pages/HomePage/HomePage';
import GithubPage from './pages/GithubPage/GithubPage';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
              <Route exact path="/" component={LoginPage}/>
              <Route path="/home" component={HomePage}/>
              <Route path="/login/github" component={GithubPage}/>
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
