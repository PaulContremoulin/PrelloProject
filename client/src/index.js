import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { store } from "./js/redux/store";

import App from './js/App';

dotenv.config({ path: '../environments/.env'});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
