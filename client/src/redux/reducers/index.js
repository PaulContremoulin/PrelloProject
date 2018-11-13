import { combineReducers } from "redux";

import { user } from './user';
import { boards } from './boards';
import { board } from './board';
import { teams } from './teams';
import { circles } from './circles';
import { circle } from './circle';
import { checklists } from './checklists';
import { comments } from './comments';
import { labels } from './labels';
import {members} from "./members";

export default combineReducers({
    user,
    boards,
    board,
    teams,
    circles,
    circle,
    checklists,
    comments,
    labels,
    members,
});
