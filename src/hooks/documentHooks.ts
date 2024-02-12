import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
} from "../reducers/modalReducer";

export const useDocumentHooks = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleSelectModal = () => {
    dispatch(handleToggleSelectModal());
  };
  const handleScanModal = () => {
    dispatch(handleToggleScanModal());
  };

  return {handleScanModal, handleSelectModal};
};
