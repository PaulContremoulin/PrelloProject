import React from 'react';
import { Route } from 'react-router';

// Components
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
// import { BoardPage } from "./pages/BoardPage/BoardPage";
import { GithubPage } from "./pages/GithubPage/GithubPage";

// Routes constants & action
import { store } from "./redux/store";
import { HOME_ROUTE, BOARD_ROUTE, ROOT_ROUTE, GITHUB_ROUTE } from "./constants";


/**
* this component define how the router should be managed
* IndexRoute is mandatory as it's the onMount path
* further customisation can be done : Route are react containers
*   they can be nested, they can render interface part
*/
export const routes = (
  <Route path={ ROOT_ROUTE } >
    <Route path={ ROOT_ROUTE } component={ LoginPage } />
    <Route path={ HOME_ROUTE } component={ HomePage } />
    <Route path={ GITHUB_ROUTE } component={ GithubPage } />
  </Route>
);
// onEnter={ isLogged }
// <Route path={ BOARD_ROUTE } component={ BoardPage } />
