import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
  handleToggleAddBatchModal,
  handleToggleOutboundItemScan,
  handleToggleScanBinModal,
  handleToggleEditBatchModal,
} from "../reducers/modalReducer";
import {
  handleSetItem,
  handleBinItemDetails,
  handleClearBin,
} from "../reducers/documentReducer";
import {showQuantityField, setStatus} from "../reducers/statusReducer";

import {useAppDispatch, useAppSelector} from "../store/store";

export const useModalHooks = () => {
  const {isScanBinModal} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const toggleOutboundItemScan = (item?: any) => {
    if (item) {
      dispatch(handleSetItem(item));
    }
    dispatch(setStatus("idle"));
    dispatch(showQuantityField(false));
    dispatch(handleToggleOutboundItemScan());
  };

  const toggleScanBinModal = (item?: any) => {
    if (item) {
      dispatch(handleSetItem(item));
    } else {
      dispatch(handleClearBin());
    }
    dispatch(showQuantityField(false));
    dispatch(setStatus("idle"));
    dispatch(handleToggleScanBinModal());
  };

  const toggleEditBatchModal = () => {
    dispatch(handleToggleEditBatchModal());
  };

  return {
    toggleOutboundItemScan,
    toggleScanBinModal,
    toggleEditBatchModal,
    isScanBinModal,
  };
};
