import { combineReducers } from "redux";

import { user } from './user';
import { boards } from './boards';
import { board } from './board';
import { teams } from './teams';
import { circles } from './circles';

export default combineReducers({
    user,
    boards,
    board,
    teams,
    circles
});
