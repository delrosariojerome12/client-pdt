import {createSlice} from "@reduxjs/toolkit";

interface Modal {
  isScanModal: boolean;
  isSelectModal: boolean;
  isScanItemModal: boolean;
  isSearchModal: boolean;
  searchModalContent: "warehouse" | "bin" | "item" | null;
  isAddBatchModal: boolean;
  isSearchBatchModal: boolean;
  isEditBatchModal: boolean;
  isOutboundItemScan: boolean;
}

const initialState: Modal = {
  isScanModal: false,
  isSelectModal: false,
  isScanItemModal: false,
  isOutboundItemScan: false,

  isAddBatchModal: false,
  isSearchBatchModal: false,
  isEditBatchModal: false,

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

    handleToggleOutboundItemScan: (state) => {
      state.isOutboundItemScan = !state.isOutboundItemScan;
    },

    handleToggleSearchModal: (state) => {
      state.isSearchModal = !state.isSearchModal;
    },
    handleSetSearchModalContent: (state, action) => {
      state.searchModalContent = action.payload;
    },
    handleCloseModal: (state, action) => {},

    handleToggleAddBatchModal: (state) => {
      state.isAddBatchModal = !state.isAddBatchModal;
    },
    handleToggleSearchBatchModal: (state) => {
      state.isSearchBatchModal = !state.isSearchBatchModal;
    },
    handleToggleEditBatchModal: (state) => {
      state.isEditBatchModal = !state.isEditBatchModal;
    },
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

  handleToggleAddBatchModal,
  handleToggleEditBatchModal,
  handleToggleSearchBatchModal,
  handleToggleOutboundItemScan,
} = modalReducer.actions;

export default modalReducer.reducer;
