import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
  handleToggleAddBatchModal,
  handleToggleOutboundItemScan,
} from "../reducers/modalReducer";
import {handleSetItem} from "../reducers/documentReducer";
import {showQuantityField, setStatus} from "../reducers/statusReducer";

import {useAppDispatch, useAppSelector} from "../store/store";

export const useModalHooks = () => {
  const {isAddBatchModal} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const toggleOutboundItemScan = (item?: any) => {
    if (item) {
      dispatch(handleSetItem(item));
    }
    dispatch(setStatus("idle"));
    dispatch(showQuantityField(false));
    dispatch(handleToggleOutboundItemScan());
  };

  return {toggleOutboundItemScan};
};
