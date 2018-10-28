import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';

//Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

dotenv.config({ path: '../environments/.env'});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={HomePage} />
        </Router>
    </Provider>
    , document.getElementById('root'));
