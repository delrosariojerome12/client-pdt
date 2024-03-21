import {createSlice} from "@reduxjs/toolkit";
import {ProductData} from "../models/generic/ProductData";

interface Document {
  selectedDocument: any | null;
  selectedItem: ProductData | null;
  selectedBatchItem: any | null;
  selectedBinDetails: any | null; //for cc and physical inventory
}

const initialState: Document = {
  selectedDocument: null,
  selectedItem: null,
  selectedBatchItem: null,
  selectedBinDetails: null,
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
  extraReducers(builder) {},
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
