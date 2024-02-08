import {combineReducers} from "@reduxjs/toolkit";
import authUser from "../reducers/authReducer";
import router from "../reducers/routerReducer";

export const rootReducer = combineReducers({
  auth: authUser,
  router: router,
});
