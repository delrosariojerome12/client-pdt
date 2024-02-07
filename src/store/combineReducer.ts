import {combineReducers} from "@reduxjs/toolkit";
import authUser from "../reducers/authReducer";

export const rootReducer = combineReducers({
  auth: authUser,
});
