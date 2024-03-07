import {createSlice} from "@reduxjs/toolkit";
import {connectToPHP} from "../store/actions/generalActions";
import {updateBatch} from "../store/actions/generalActions";
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
      console.log("reset should work");
      state.status = "idle";
    },
    setStatusText: (state, action) => {
      state.statusText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(connectToPHP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(connectToPHP.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "success";
      })
      .addCase(connectToPHP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(updateBatch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBatch.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "success";
      })
      .addCase(updateBatch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {resetStatus, setStatusText} = statusReducer.actions;

export default statusReducer.reducer;
