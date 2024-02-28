import {createSlice} from "@reduxjs/toolkit";

interface Outbound {}

const initialState = {};

const outboundReducer = createSlice({
  name: "outbound",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const {} = outboundReducer.actions;

export default outboundReducer.reducer;
