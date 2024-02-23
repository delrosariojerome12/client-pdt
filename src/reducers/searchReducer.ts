import {createSlice} from "@reduxjs/toolkit";

interface searchProps {
  warehouse: any | null;
  binNoText: string;
  itemText: string;
}
const initialState: searchProps = {
  warehouse: null,
  binNoText: "",
  itemText: "",
};

export const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleSetWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
    handleSetBinText: (state, action) => {
      state.binNoText = action.payload;
    },
    handleSetItemText: (state, action) => {
      state.itemText = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {handleSetWarehouse, handleSetBinText, handleSetItemText} =
  searchReducer.actions;

export default searchReducer.reducer;
