import {Alert} from "react-native";
import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
} from "../reducers/modalReducer";

import {handleSetDocument, handleSetItem} from "../reducers/documentReducer";

interface SearchContent {
  content: "warehouse" | "bin" | "item";
}

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

  const handleSearchModal = (content: SearchContent) => {
    dispatch(handleToggleSearchModal());
    dispatch(handleSetSearchModalContent(content.content));
  };
  const closeItemScanModal = () => {
    dispatch(handleToggleItemScanModal());
  };

  const handlePost = (item: any) => {
    Alert.alert("Transaction Posting", `Do you want to post '${item.docnum}'`, [
      {text: "Yes", onPress: () => alert("No api yet."), style: "destructive"},
      {text: "No", style: "cancel"}, // Just close the alert without any action
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
        {text: "No", style: "cancel"},
      ]
    );
    console.log("remove", item);
    console.log("parent", selectedDocument);
  };

  const validateCycleCount = (item: any) => {
    alert("No api yet");
  };

  const validatePhysicalRecord = (item: any) => {
    Alert.alert("Validation", `Do you want to validate '${item.pirNo}'`, [
      {
        text: "Yes",
        onPress: () => alert("No api yet."),
        style: "destructive",
      },
      {text: "No", style: "cancel"}, // Just close the alert without any action
    ]);
  };

  return {
    handleScanModal,
    handleSelectModal,
    handleSearchModal,
    closeSelectModal,
    handleItemScanModal,
    closeItemScanModal,
    handlePost,
    handleScan,
    validateBin,
    removeScannedQuantity,
    validateCycleCount,
    validatePhysicalRecord,
  };
};
