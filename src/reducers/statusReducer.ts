import {createSlice} from "@reduxjs/toolkit";
import {connectToPHP} from "../store/actions/generalActions";

interface Status {
  status: "idle" | "loading" | "success" | "failed";
  statusText: string; // custom message for statuses
}

const initialState: Status = {
  status: "idle",
  statusText: "",
};

const statusReducer = createSlice({
  name: "status",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(connectToPHP.pending, (state) => {
        console.log("dito?");

        state.status = "loading";
      })
      .addCase(connectToPHP.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "success";
      })
      .addCase(connectToPHP.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {resetStatus} = statusReducer.actions;

export default statusReducer.reducer;
