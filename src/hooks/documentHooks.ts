import {Alert} from "react-native";
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

  const handlePost = (item: any) => {
    Alert.alert("Transaction Posting", `Do you want to post '${item.docnum}'`, [
      {text: "OK", onPress: () => alert("No api yet.")},
    ]);
  };
  const handleScan = () => {
    alert("No api yet");
  };
  const validateBin = () => {
    alert("No api yet");
  };

  return {
    handleScanModal,
    handleSelectModal,
    closeSelectModal,
    handleItemScanModal,
    closeItemScanModal,
    handlePost,
    handleScan,
    validateBin,
  };
};
