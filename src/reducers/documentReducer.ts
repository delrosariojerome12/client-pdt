import {createSlice} from "@reduxjs/toolkit";
import {ProductData} from "../models/generic/ProductData";

interface Document {
  selectedDocument: any | null;
  selectedItem: ProductData | null;
  selectedBatchItem: any | null;
}

const initialState: Document = {
  selectedDocument: null,
  selectedItem: null,
  selectedBatchItem: null,
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
    },
    handleSetItem: (state, action) => {
      state.selectedItem = action.payload;
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
} = documentReducer.actions;

export default documentReducer.reducer;
