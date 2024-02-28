import {combineReducers} from "@reduxjs/toolkit";
import authUser from "../reducers/authReducer";
import router from "../reducers/routerReducer";
import modal from "../reducers/modalReducer";
import document from "../reducers/documentReducer";
import search from "../reducers/searchReducer";
// screens
import inbound from "../reducers/warehouse/inboundReducer";
import outbound from "../reducers/warehouse/outboundReducer";

export const rootReducer = combineReducers({
  auth: authUser,
  router: router,
  modal: modal,
  document: document,
  search: search,
  inbound: inbound,
  outbound: outbound,
});
