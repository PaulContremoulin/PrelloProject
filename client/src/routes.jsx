import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components
import { LoginPage } from "./pages/LoginPage";

// Routes constants & action
import { store } from "./redux/store";


/**
* this component define how the router should be managed
* IndexRoute is mandatory as it's the onMount path
* further customisation can be done : Route are react containers
*   they can be nested, they can render interface part
*/
export const routes = (
  <Route  >
    <IndexRoute component={ LoginPage } onEnter={ isLogged } />
  </Route>
);
