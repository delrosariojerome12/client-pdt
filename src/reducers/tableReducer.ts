import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../models/generic/ProductData";
import {
  getStockTODetails,
  getStockTOPosting,
  getStockTOValid,
} from "../store/actions/ims/replenishment";
import { getDTSValid, getDTSPosting } from "../store/actions/ims/subcon";
import { getphysicalRecord } from "../store/actions/ims/physicalCount";

import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";

interface AsyncAction<T> {
  pending: string;
  fulfilled: string;
  rejected: string;
}

interface Table {
  tableData: {
    data: any[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
  tableDetails: {
    data: any[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: Table = {
  tableData: {
    data: [],
    status: "idle",
  },
  tableDetails: {
    data: [],
    status: "idle",
  },
};

const createAsyncReducerCases = <T>(
  builder: ActionReducerMapBuilder<any>,
  asyncAction: AsyncAction<T>,
  stateKey: string
) => {
  return builder
    .addCase(asyncAction.pending, (state, action) => {
      const asyncState = state[stateKey];
      if (asyncState) {
        asyncState.status = "loading";
      }
    })
    .addCase(asyncAction.fulfilled, (state, action: any) => {
      const asyncState = state[stateKey];
      if (asyncState) {
        const { data, paginating } = action.payload;

        if (paginating) {
          asyncState.data = [...asyncState.data, ...data.data];
          console.log("paginating fetch");
        } else {
          console.log("normal fetch");

          asyncState.data = data.data || data;
        }
        asyncState.status = "success";
      }
    })
    .addCase(asyncAction.rejected, (state, action) => {
      const asyncState = state[stateKey];
      if (asyncState) {
        asyncState.status = "failed";
      }
    });
};

const tableReducer = createSlice({
  name: "table",
  initialState,
  reducers: {
    handleClearTableData: (state, action) => {
      state.tableData.data = [];
      state.tableData.status = "idle";
    },
  },
  extraReducers(builder) {
    createAsyncReducerCases(
      builder,
      {
        pending: getStockTOValid.pending.type,
        fulfilled: getStockTOValid.fulfilled.type,
        rejected: getStockTOValid.rejected.type,
      },
      "tableData"
    );
    createAsyncReducerCases(
      builder,
      {
        pending: getStockTOPosting.pending.type,
        fulfilled: getStockTOPosting.fulfilled.type,
        rejected: getStockTOPosting.rejected.type,
      },
      "tableData"
    );
    createAsyncReducerCases(
      builder,
      {
        pending: getStockTODetails.pending.type,
        fulfilled: getStockTODetails.fulfilled.type,
        rejected: getStockTODetails.rejected.type,
      },
      "tableDetails"
    );

    createAsyncReducerCases(
      builder,
      {
        pending: getDTSValid.pending.type,
        fulfilled: getDTSValid.fulfilled.type,
        rejected: getDTSValid.rejected.type,
      },
      "tableData"
    );
  },
});

export const { handleClearTableData } = tableReducer.actions;

export default tableReducer.reducer;
