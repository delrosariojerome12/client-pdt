import {createSlice} from "@reduxjs/toolkit";

interface Modal {
  isScanModal: boolean;
  isSelectModal: boolean;
  isScanItemModal: boolean;
  isSearchModal: boolean;
  searchModalContent: "warehouse" | "bin" | "item" | null;
}

const initialState: Modal = {
  isScanModal: false,
  isSelectModal: false,
  isScanItemModal: false,
  isSearchModal: false,
  searchModalContent: null,
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
    handleToggleItemScanModal: (state) => {
      state.isScanItemModal = !state.isScanItemModal;
    },

    handleToggleSearchModal: (state) => {
      state.isSearchModal = !state.isSearchModal;
    },
    handleSetSearchModalContent: (state, action) => {
      state.searchModalContent = action.payload;
    },
    handleCloseModal: (state, action) => {},
  },
  extraReducers(builder) {},
});

export const {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleCloseModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
} = modalReducer.actions;

export default modalReducer.reducer;
