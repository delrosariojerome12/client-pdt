import {createSlice} from "@reduxjs/toolkit";

interface Modal {
  isScanModal: boolean;
  isSelectModal: boolean;
}

const initialState: Modal = {
  isScanModal: false,
  isSelectModal: false,
};

const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleToggleScanModal: (state) => {
      state.isScanModal = !state.isScanModal;
    },
    handleToggleSelectModal: (state) => {
      state.isSelectModal = !state.isSelectModal;
    },

    handleCloseModal: (state, action) => {},
  },
  extraReducers(builder) {},
});

export const {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleCloseModal,
} = modalReducer.actions;

export default modalReducer.reducer;
