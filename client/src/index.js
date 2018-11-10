import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import {isLogged} from "./headers";

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';

import { history } from './history';
//Pages
import {NavBar} from "./components/NavBar/NavBar";
import {MainPage} from "./pages/MainPage/MainPage";
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPswdPage from "./pages/ResetPswdPage/ResetPswdPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import {HomePage} from './pages/HomePage/HomePage';
import {AccountPage} from './pages/AccountPage/AccountPage';
import {ChangePswd} from "./components/SignInOrSignUp/ChangePswd/ChangePswd";
import {BoardPage} from './pages/BoardPage/BoardPage';
import {PageNoFound} from "./pages/PageNoFound/PageNoFound";
import {GithubPage} from "./pages/GithubPage/GithubPage";
import {CirclePage} from "./pages/CirclePage/CirclePage";
import {SettingsBoard} from "./components/SettingsBoard/SettingsBoard";

console.log(isLogged());

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
            <div className="index">
                <NavBar/>
                <Switch>
                    <Route exact path='/' render={() => (isLogged() ? (<Redirect to="/home"/>) : (<MainPage />))}/>
                    <Route exact path='/login' render={() => (isLogged() ? (<Redirect to="/home"/>) : (<LoginPage />))}/>
                    <Route exact path='/registration' render={() => (isLogged() ? (<Redirect to="/home"/>) : (<RegistrationPage />))}/>
                    <Route exact path='/reset/password' render={() => (isLogged() ? (<Redirect to="/home"/>) : (<ResetPswdPage />))}/>
                    <Route exact path='/home' render={() => (!isLogged() ? (<Redirect to="/login"/>) : (<HomePage />))}/>
                    <Route exact path='/account' render={() => (!isLogged() ? (<Redirect to="/login"/>) : (<AccountPage />))}/>
                    <Route exact path='/login/reset/:idmembre/password' component={ChangePswd}/>
                    <Route exact path='/circle/:idcircle/:namecircle' render={({match}) => (!isLogged() ? (<Redirect to="/login"/>) : (<CirclePage idCircle={match.params.idcircle} nameCircle={match.params.namecircle} />))}/>
                    <Route exact path='/board/:idBoard/:boardName' render={() => (!isLogged() ? (<Redirect to="/login"/>) : (<BoardPage />))}/>
                    <Route exact path='/board/:idBoard/:boardName/settings' render={({match}) => (!isLogged() ? (<Redirect to="/login"/>) : (<SettingsBoard boardName={match.params.boardName} boardId={match.params.idBoard}/>))}/>
                    <Route path='/login/github' component={GithubPage}/>
                    <Route component={PageNoFound}/>
                </Switch>
            </div>
        </Router>
      </PersistGate>
    </Provider>
    , document.getElementById('root'));
