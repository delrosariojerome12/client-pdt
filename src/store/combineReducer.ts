import {combineReducers} from "@reduxjs/toolkit";
import authUser from "../reducers/authReducer";
import router from "../reducers/routerReducer";
import modal from "../reducers/modalReducer";
import document from "../reducers/documentReducer";
import search from "../reducers/searchReducer";

export const rootReducer = combineReducers({
  auth: authUser,
  router: router,
  modal: modal,
  document: document,
  search: search,
});
