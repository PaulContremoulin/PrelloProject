import { combineReducers } from "redux";

import { user } from './user';
import { boards } from './boards';
import { board } from './board';
import { circles } from './circles';
import { circle } from './circle';
import { checklists, checkItems } from './checklists';
import { comments } from './comments';
import { labels } from './labels';
import {members} from "./members";
import {state} from "./state";

export default combineReducers({
    user,
    boards,
    board,
    circles,
    circle,
    checklists,
    comments,
    labels,
    members,
    state,
});
