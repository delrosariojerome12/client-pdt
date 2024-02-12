import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
} from "../reducers/modalReducer";

import {
  handleSetDocument,
  handleSetScanFields,
} from "../reducers/documentReducer";

export const useDocumentHooks = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
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

  return {handleScanModal, handleSelectModal, closeSelectModal};
};
