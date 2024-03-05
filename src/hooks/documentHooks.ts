import {Alert, Keyboard} from "react-native";
import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
} from "../reducers/modalReducer";
import {
  getPTODetails,
  getSRTODetails,
  getWTOOutboundDetails,
  getWPTODetails,
  getSTGValidateDetails,
  getPTO,
  getPUR,
} from "../store/actions/warehouse/warehouseActions";
import {handleSetDocument, handleSetItem} from "../reducers/documentReducer";
import {getDocument} from "../store/actions/generalActions";
import {ScanDocumentParams} from "../store/actions/generalActions";
// import {useConnectPHPHook} from "./connectPHPHook";
import {connectToPHP} from "../store/actions/generalActions";
import {resetStatus} from "../reducers/statusReducer";

interface SearchContent {
  content: "warehouse" | "bin" | "item";
}
export type TypePost = "pto" | "pur";

export type TypeSelect =
  | "pto"
  | "srto"
  | "wto-inbound"
  | "wto-outbound"
  | "wavepick"
  | "stg-validate";

export interface SelectProps {
  type: TypeSelect;
  item: any;
}

export interface PostProps {
  type: TypePost;
  item: any;
}

export const useDocumentHooks = () => {
  const {selectedDocument} = useAppSelector((state) => state.document);
  const dispatch = useAppDispatch();
  // const {connectToPHP} = useConnectPHPHook();

  const checkSelectType = ({item, type}: SelectProps) => {
    console.log(type);

    switch (type) {
      case "pto":
        dispatch(getPTODetails({docnum: item.docnum}));
        break;
      case "srto":
        dispatch(getSRTODetails({docnum: item.docnum}));
        break;
      case "wto-outbound":
        dispatch(getWTOOutboundDetails({docnum: item.docnum}));
        break;
      case "wavepick":
        dispatch(getWPTODetails({docnum: item.docnum}));
        break;
      case "stg-validate":
        dispatch(getSTGValidateDetails({docnum: item.docnum}));
        break;
      default:
        break;
    }
  };

  const checkPostType = (item: any, type: TypePost) => {
    switch (type) {
      case "pto":
        console.log(item.recid, item.docnum);

        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "PTO",
            onSuccess: () => {
              dispatch(getPTO({limit: 10, offset: 0}));
              dispatch(resetStatus());
            },
            onFailure: (e) => {
              Alert.alert("Transaction Posting", `Something Went Wrong: ${e}`, [
                {
                  text: "Ok",
                  onPress: () => {},
                  style: "destructive",
                },
              ]);
            },
          })
        );
        break;
      case "pur":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "PTAPUR",
            onSuccess: () => {
              dispatch(getPUR({limit: 10, offset: 0}));
              dispatch(resetStatus());
            },
            onFailure: () => {},
          })
        );
        break;

      default:
        alert("No api yet.");
        break;
    }
  };

  const handleSelectModal = ({item, type}: SelectProps) => {
    console.log(type, item);

    // FETCH-DOCNUM-DETAILS-ONSELECT
    checkSelectType({item, type});
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

  const handlePost = ({item, type}: PostProps) => {
    Alert.alert("Transaction Posting", `Do you want to post '${item.docnum}'`, [
      {
        text: "Yes",
        onPress: () => {
          checkPostType(item, type);
        },
        style: "destructive",
      },
      {text: "No", style: "cancel"}, // Just close the alert without any action
    ]);
  };

  const handleScan = ({barcode, category}: ScanDocumentParams) => {
    if (!barcode) {
      alert("Please make sure barcode field is filled.");
    } else {
      console.log("shet");
      dispatch(getDocument({barcode, category}));
    }
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
