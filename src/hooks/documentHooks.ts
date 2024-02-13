import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
} from "../reducers/modalReducer";

import {
  handleSetDocument,
  handleSetScanFields,
  handleSetItem,
} from "../reducers/documentReducer";

export const useDocumentHooks = () => {
  // const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleSelectModal = (item: any) => {
    dispatch(handleSetDocument(item));
    dispatch(handleToggleSelectModal());
  };
  const handleScanModal = () => {
    dispatch(handleToggleScanModal());
  };

  const closeSelectModal = () => {
    dispatch(handleToggleSelectModal());
  };

  const handleItemScanModal = (item: any) => {
    dispatch(handleToggleItemScanModal());
    dispatch(handleSetItem(item));
  };
  const closeItemScanModal = () => {
    dispatch(handleToggleItemScanModal());
  };

  return {
    handleScanModal,
    handleSelectModal,
    closeSelectModal,
    handleItemScanModal,
    closeItemScanModal,
  };
};
