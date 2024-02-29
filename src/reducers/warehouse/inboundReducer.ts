import {createSlice} from "@reduxjs/toolkit";
import {
  getPTO,
  getPTODetails,
  paginatePTO,
} from "../../store/actions/warehouse/warehouseActions";
import {PTOData} from "../../models/warehouse/inbound/PTO";
import {ProductData} from "../../models/generic/ProductData";

interface Inbound {
  pto: {
    data: PTOData[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  ptoDetails: {
    data: ProductData[];
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: Inbound = {
  pto: {
    data: [],
    status: "idle",
  },
  ptoDetails: {
    data: [],
    status: "idle",
  },
};

const inboundReducer = createSlice({
  name: "inbound",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPTO.pending, (state, action) => {
        state.pto.status = "loading";
      })
      .addCase(getPTO.fulfilled, (state, action) => {
        console.log("eto nga", action.payload.data.length);
        state.pto.data = action.payload.data;
        state.pto.status = "success";
      })
      .addCase(getPTO.rejected, (state, action) => {
        state.pto.status = "failed";
      });
    builder
      .addCase(paginatePTO.pending, (state, action) => {
        // state.pto.status = "loading";
      })
      .addCase(paginatePTO.fulfilled, (state, action) => {
        console.log("eto nga", action.payload.data.length);
        state.pto.data = [...state.pto.data, ...action.payload.data];
        // state.pto.status = "success";
      })
      .addCase(paginatePTO.rejected, (state, action) => {
        // state.pto.status = "failed";
      });
    builder
      .addCase(getPTODetails.pending, (state, action) => {
        state.ptoDetails.status = "loading";
      })
      .addCase(getPTODetails.fulfilled, (state, action) => {
        state.ptoDetails.status = "success";
        state.ptoDetails.data = action.payload.data;
      })
      .addCase(getPTODetails.rejected, (state, action) => {
        state.ptoDetails.status = "failed";
      });
  },
});

export const {} = inboundReducer.actions;

export default inboundReducer.reducer;
