import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./js/redux/store";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';

//Pages
import LoginPage from './js/pages/LoginPage';

dotenv.config({ path: '../environments/.env'});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={LoginPage} />
        </Router>
    </Provider>
    , document.getElementById('root'));
