import { createSlice } from "@reduxjs/toolkit";

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
  isNotificationModal: boolean;
  notificationText: string;
  isScanBinModal: boolean;

  // isSourceOps
  isSourceScanning: boolean;
  isTargetScanning: boolean;
}

const initialState: Modal = {
  isScanModal: false,
  isSelectModal: false,
  isScanItemModal: false,
  isOutboundItemScan: false,
  isNotificationModal: false,
  isScanBinModal: false,

  notificationText: "",

  isAddBatchModal: false,
  isSearchBatchModal: false,
  isEditBatchModal: false,

  isSearchModal: false,
  searchModalContent: null,
  isSourceScanning: false,
  isTargetScanning: false,
};

const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleTargetScanning: (state) => {
      state.isTargetScanning = !state.isTargetScanning;
    },
    handleSourceScanning: (state) => {
      state.isSourceScanning = !state.isSourceScanning;
    },

    handleToggleNotificationModal: (state) => {
      state.isNotificationModal = !state.isNotificationModal;
    },
    handleSetNotificationText: (state, action) => {
      state.notificationText = action.payload;
    },
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

    handleToggleScanBinModal: (state) => {
      state.isScanBinModal = !state.isScanBinModal;
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
  handleToggleNotificationModal,
  handleSetNotificationText,
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
  handleToggleScanBinModal,
  handleSourceScanning,
  handleTargetScanning,
} = modalReducer.actions;

export default modalReducer.reducer;
