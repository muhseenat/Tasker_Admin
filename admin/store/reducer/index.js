import { combineReducers } from "redux";

import admin from './adminReducer';

const rootReducer=combineReducers({
    admin,
})
export  default rootReducer;