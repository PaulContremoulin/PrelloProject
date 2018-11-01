import { combineReducers } from "redux";

import { user } from './user';
import boards from './boards';
import { teams } from './teams';
import { circles } from './circles';

export default combineReducers({
    user,
    boards,
    //teams,
    //circles
});
