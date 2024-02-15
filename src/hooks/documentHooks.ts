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
  const {selectedDocument} = useAppSelector((state) => state.document);
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
      {text: "Yes", onPress: () => alert("No api yet."), style: "destructive"},
      {text: "No", onPress: () => alert("No api yet."), style: "cancel"},
    ]);
  };
  const handleScan = () => {
    alert("No api yet");
  };
  const validateBin = () => {
    alert("No api yet");
  };

  const removeScannedQuantity = (item: any) => {
    // clear scanned items
    Alert.alert(
      "Remove Scanned Items",
      `Are you sure you want to remove the scanned quantity of item line no. 1`,
      [
        {
          text: "Yes",
          onPress: () => alert("No api yet."),
          style: "destructive",
        },
        {text: "No", onPress: () => alert("No api yet."), style: "cancel"},
      ]
    );
    console.log("remove", item);
    console.log("parent", selectedDocument);
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
    removeScannedQuantity,
  };
};
