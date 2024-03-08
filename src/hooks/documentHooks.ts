import {Alert, Keyboard} from "react-native";
import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
  handleToggleAddBatchModal,
  handleToggleEditBatchModal,
  handleToggleSearchBatchModal,
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
import {
  handleSetDocument,
  handleSetItem,
  handleSetBatchItem,
} from "../reducers/documentReducer";
import {getDocument, updateBatch} from "../store/actions/generalActions";
import {ScanDocumentParams} from "../store/actions/generalActions";
import {connectToPHP} from "../store/actions/generalActions";
import {resetStatus} from "../reducers/statusReducer";
import {formatDateYYYYMMDD} from "../helper/Date";
import {clearBatchDetails} from "../reducers/generalReducer";
import {useAPIHooks} from "./apiHooks";
interface SearchContent {
  content: "warehouse" | "bin" | "item";
}
export type TypePost = "pto" | "pur" | "pto-add-batch";

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
  customMessage?: {
    header: string;
    body: string;
  };
}

export const useDocumentHooks = () => {
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {
    batchDetails: {batchNo, expDate, mfgDate},
  } = useAppSelector((state) => state.general);

  const dispatch = useAppDispatch();
  const {scanBarcode} = useAPIHooks();

  // checking uses
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
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "PTO",
            onSuccess: () => {
              dispatch(getPTO({limit: 10, offset: 0}));
            },
            onFailure: (e) => {
              dispatch(resetStatus());
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
      case "pto-add-batch":
        dispatch(
          connectToPHP({
            recid: selectedDocument.recid,
            docnum: selectedDocument.docnum,
            type: "PTO_ADDBATCH",
            refnum: "",
            lpnnum: item.lpnnum,
            itmcde: item.itmcde,
            itmdsc: item.itmdsc,
            batchnum: batchNo,
            mfgdte: formatDateYYYYMMDD(mfgDate),
            expdte: formatDateYYYYMMDD(expDate),
            copyline: item.copyline,
            onSuccess: () => {
              dispatch(resetStatus());
              dispatch(clearBatchDetails());
              dispatch(getPTODetails({docnum: selectedDocument.docnum}));
              dispatch(handleToggleAddBatchModal());
            },
            onFailure: (e) => {
              Alert.alert("Batch Details Posting", `Something Went Wrong`, [
                {
                  text: "Ok",
                  onPress: () => {},
                  style: "destructive",
                },
              ]);
              console.log(e);
            },
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
    dispatch(resetStatus());
  };

  const handleScanModal = () => {
    dispatch(handleToggleScanModal());
  };

  const closeSelectModal = () => {
    dispatch(handleToggleSelectModal());
    dispatch(resetStatus());
  };

  const handleItemScanModal = (item: any) => {
    dispatch(handleToggleItemScanModal());
    dispatch(handleSetItem(item));
    dispatch(resetStatus());
  };
  const handleSearchModal = (content: SearchContent) => {
    dispatch(handleToggleSearchModal());
    dispatch(handleSetSearchModalContent(content.content));
    dispatch(resetStatus());
  };
  const closeItemScanModal = () => {
    dispatch(handleToggleItemScanModal());
    dispatch(resetStatus());
  };

  const handlePost = ({item, type, customMessage}: PostProps) => {
    // checkPostType(item, type);
    if (customMessage) {
      Alert.alert(`${customMessage.header}`, `${customMessage.body}`, [
        {
          text: "Yes",
          onPress: () => {
            checkPostType(item, type);
          },
          style: "destructive",
        },
        {text: "No", style: "cancel"},
      ]);
    } else {
      Alert.alert(
        "Transaction Posting",
        `Do you want to post '${item.docnum}'`,
        [
          {
            text: "Yes",
            onPress: () => {
              checkPostType(item, type);
            },
            style: "destructive",
          },
          {text: "No", style: "cancel"}, // Just close the alert without any action
        ]
      );
    }
  };

  const handleScan = async (
    {barcode, category}: ScanDocumentParams,
    typeForFetching: TypeSelect
  ) => {
    if (!barcode) {
      Alert.alert(
        "Empty Barcode",
        "Please make sure barcode field is filled.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    try {
      const response = await scanBarcode({barcode, category});
      handleSelectModal({item: response.data, type: typeForFetching});
      handleScanModal();
    } catch (error) {
      console.log("incorrect barcode");
    }
  };
  const validateBin = () => {
    alert("No api yet");
  };

  // const removeScannedQuantity = (item: any) => {
  //   // clear scanned items
  //   Alert.alert(
  //     "Remove Scanned Items",
  //     `Are you sure you want to remove the scanned quantity of item line no. 1`,
  //     [
  //       {
  //         text: "Yes",
  //         onPress: () => alert("No api yet."),
  //         style: "destructive",
  //       },
  //       {text: "No", style: "cancel"},
  //     ]
  //   );
  // };

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
    // removeScannedQuantity,
    validateCycleCount,
    validatePhysicalRecord,
  };
};
