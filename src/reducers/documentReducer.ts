import {createSlice} from "@reduxjs/toolkit";

interface Document {
  selectedDocument: any | null;
  selectedItem: any | null;
  // scanFields: string;
}

const initialState: Document = {
  selectedDocument: null,
  selectedItem: null,
  // scanFields: "",
};

const documentReducer = createSlice({
  name: "document",
  initialState,
  reducers: {
    handleSetDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    handleSetScanFields: (state, action) => {
      // state.scanFields = action.payload;
    },
    handleSetItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {handleSetDocument, handleSetScanFields, handleSetItem} =
  documentReducer.actions;

export default documentReducer.reducer;
