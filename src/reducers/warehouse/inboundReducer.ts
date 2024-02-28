import {createSlice} from "@reduxjs/toolkit";
import {getPTO} from "../../store/actions/warehouse/warehouseActions";
import {PTOData} from "../../models/warehouse/inbound/PTO";

interface Inbound {
  ptoData: PTOData[] | [];
}

const initialState: Inbound = {
  ptoData: [],
};

const inboundReducer = createSlice({
  name: "inbound",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPTO.pending, (state, action) => {})
      .addCase(getPTO.fulfilled, (state, action) => {
        console.log("eto nga", action.payload.data.length);

        state.ptoData = action.payload;
      })
      .addCase(getPTO.rejected, (state, action) => {});
  },
});

export const {} = inboundReducer.actions;

export default inboundReducer.reducer;
