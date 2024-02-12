import {createSlice} from "@reduxjs/toolkit";

interface Document {
  selectedDocument: any | null;
  scanFields: string;
}

const initialState: Document = {
  selectedDocument: null,
  scanFields: "",
};

const documentReducer = createSlice({
  name: "document",
  initialState,
  reducers: {
    handleSetDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    handleSetScanFields: (state, action) => {
      state.scanFields = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {handleSetDocument, handleSetScanFields} = documentReducer.actions;

export default documentReducer.reducer;
