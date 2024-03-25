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

// Define a type for the async action
interface AsyncAction<T> {
  pending: string;
  fulfilled: string;
  rejected: string;
}

interface Document {
  selectedDocument: any | null;
  selectedItem: ProductData | null;
  selectedBatchItem: any | null;
  selectedBinDetails: any | null; //for cc and physical inventory
  tableData: {
    data: any[] | [];
    status: "idle" | "loading" | "success" | "failed";
  };
}

const initialState: Document = {
  selectedDocument: null,
  selectedItem: null,
  selectedBatchItem: null,
  selectedBinDetails: null,
  tableData: {
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
        console.log("nagana,", action.payload);

        if (paginating) {
          asyncState.data = [...asyncState.data, ...data.data];
        } else {
          asyncState.data = data.data;
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

const documentReducer = createSlice({
  name: "document",
  initialState,
  reducers: {
    handleSetDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    handleClearDocument: (state) => {
      state.selectedDocument = null;
      state.selectedBinDetails = null;
    },
    handleClearBin: (state) => {
      state.selectedBinDetails = null;
    },
    handleSetItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    handleBinItemDetails: (state, action) => {
      state.selectedBinDetails = action.payload;
    },
    handleSetBatchItem: (state, action) => {
      state.selectedBatchItem = action.payload;
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
        pending: getDTSValid.pending.type,
        fulfilled: getDTSValid.fulfilled.type,
        rejected: getDTSValid.rejected.type,
      },
      "tableData"
    );
  },
});

export const {
  handleSetDocument,
  handleClearDocument,
  handleSetItem,
  handleSetBatchItem,
  handleBinItemDetails,
  handleClearBin,
} = documentReducer.actions;

export default documentReducer.reducer;
