import { combineReducers } from "@reduxjs/toolkit";
import authUser from "../reducers/authReducer";
import router from "../reducers/routerReducer";
import modal from "../reducers/modalReducer";
import document from "../reducers/documentReducer";
import search from "../reducers/searchReducer";
import status from "../reducers/statusReducer";
import general from "../reducers/generalReducer";
import table from "../reducers/tableReducer";
// screens
import inbound from "../reducers/warehouse/inboundReducer";
import outbound from "../reducers/warehouse/outboundReducer";
import inventoryTransaction from "../reducers/inventoryManagement/inventoryTransactionReducer";
import subcon from "../reducers/inventoryManagement/subconReducer";

export const rootReducer = combineReducers({
  auth: authUser,
  router: router,
  modal: modal,
  document: document,
  search: search,
  status: status,
  general: general,
  inbound: inbound,
  outbound: outbound,
  inventoryTransaction: inventoryTransaction,
  subcon: subcon,
  table: table,
});
