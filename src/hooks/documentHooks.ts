import {Alert, Keyboard} from "react-native";
import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
  handleToggleAddBatchModal,
  handleToggleOutboundItemScan,
} from "../reducers/modalReducer";
import {
  getPTODetails,
  getSRTODetails,
  getWTOOutboundDetails,
  getWPTODetails,
  getSTGValidateDetails,
  getPTO,
  getWTO,
  getPUR,
  getWTOOutboundValid,
  getWTOOutboundPost,
  getWTODetails,
} from "../store/actions/warehouse/warehouseActions";
import {handleSetDocument, handleSetItem} from "../reducers/documentReducer";
import {ScanDocumentParams} from "../store/actions/generalActions";
import {connectToPHP} from "../store/actions/generalActions";
import {resetStatus, setStatus} from "../reducers/statusReducer";
import {formatDateYYYYMMDD} from "../helper/Date";
import {clearBatchDetails} from "../reducers/generalReducer";
import {useAPIHooks} from "./apiHooks";
import {setStatusText, showQuantityField} from "../reducers/statusReducer";

export type ButtonUses =
  | "pto"
  | "pur"
  | "wto-inbound"
  | "wto"
  | "whs"
  | "srto"
  | "wto-outbound"
  | "wavepick"
  | "";

interface SearchContent {
  content: "warehouse" | "bin" | "item";
}
export type TypePost =
  | "pto"
  | "pur"
  | "whs"
  | "wto-inbound"
  | "pto-add-batch"
  | "wto-outbound";

export type ScanValidate =
  | "pto"
  | "pur"
  | "whs"
  | "wto-inbound"
  | "srto"
  | "wto-outbound"
  | "wavepick"
  | "stg-validate";

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
  const {
    user: {userDetails},
  } = useAppSelector((state) => state.auth);
  const {selectedDocument, selectedItem} = useAppSelector(
    (state) => state.document
  );
  const {isQuantityFieldShown} = useAppSelector((state) => state.status);
  const {
    batchDetails: {batchNo, expDate, mfgDate},
  } = useAppSelector((state) => state.general);

  const dispatch = useAppDispatch();
  const {scanBarcode, getLPN, getBinAndValidate, connectToPHPNotDispatch} =
    useAPIHooks();

  // start check categories and uses functions
  const checkSelectType = ({item, type}: SelectProps) => {
    console.log(type);

    switch (type) {
      case "pto":
        dispatch(getPTODetails({docnum: item.docnum}));
        break;
      case "srto":
        dispatch(getSRTODetails({docnum: item.docnum}));
        break;
      case "wto-inbound":
        dispatch(getWTODetails({docnum: item.docnum}));
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

  const checkPostType = async (item: any, type: TypePost) => {
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
              Alert.alert("Transaction Posting Fail", `${e}`, [
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
            docnum: item.intnum,
            type: "PTAPUR",
            onSuccess: () => {
              dispatch(getPUR({limit: 10, offset: 0}));
              dispatch(resetStatus());
            },
            onFailure: (e) => {
              dispatch(resetStatus());
              Alert.alert("Transaction Posting Fail", ` ${e}`, [
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
      case "wto-inbound":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "WTO",
            onSuccess: () => {
              dispatch(getWTO({limit: 10, offset: 0}));
              dispatch(resetStatus());
            },
            onFailure: (e) => {
              dispatch(resetStatus());
              Alert.alert("Transaction Posting Fail", ` ${e}`, [
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
              Alert.alert(
                "Batch Details Posting",
                `${e || "Something Went wrong"}`,
                [
                  {
                    text: "Ok",
                    onPress: () => {},
                    style: "destructive",
                  },
                ]
              );
              console.log(e);
            },
          })
        );
        break;
      case "wto-outbound":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "WTO_SOFTVAL",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              console.log("loading muna");
              await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "WTO_POST",
              });
              console.log("dito sunod");
              dispatch(
                getWTOOutboundPost({
                  limit: 10,
                  offset: 0,
                })
              );
              console.log("tapos na");
              // setStatus("success");
              dispatch(setStatus("success"));
            },
            onFailure: (e) => {
              dispatch(resetStatus());
              Alert.alert("Transaction Posting Fail", `${e}`, [
                {
                  text: "Ok",
                  onPress: () => {},
                  style: "destructive",
                },
              ]);
            },
            dontShowSuccess: true,
          })
        );

        break;

      default:
        alert("No api yet.");
        break;
    }
  };

  // scanning item
  const checkScanType = async (
    {
      barcode,
      receiveQty,
      barcodelvl2,
    }: {barcode: string; receiveQty: number; barcodelvl2?: string},
    scanUsage: ScanValidate
  ) => {
    if (selectedItem) {
      switch (scanUsage) {
        case "pto":
          const ptoResponse = await scanBarcode({
            barcode,
            category: "lpnnum",
            recid: selectedItem?.recid.toString(),
            docnum: selectedDocument.docnum,
            itmcde: selectedItem.itmcde,
            untmea: selectedItem.untmea,
            lpnnum: selectedItem.lpnnum,
            itmqty: selectedItem.itmqty,
            intqty: selectedItem.intqty,
            linklpnnum: selectedItem.linklpnnum || "null",
            addbatch: selectedItem.addbatch.toString(),
            copyline: selectedItem.copyline.toString(),
            pdtmanualqtyinbound: receiveQty.toString(),
            linenum: selectedItem.linenum.toString(),
            usrnam: userDetails?.usrcde,
          });

          if (ptoResponse && ptoResponse.data.pto2_data) {
            dispatch(getPTODetails({docnum: selectedDocument.docnum}));
            dispatch(getPTO({limit: 10, offset: 0}));
            if (ptoResponse.data.pto2_data[0]) {
              dispatch(handleSetItem(ptoResponse.data.pto2_data[0]));
            }
            if (ptoResponse.data.pto2_data.length === 0) {
              dispatch(setStatusText(`Item Successfully Scanned.`));
              dispatch(handleToggleItemScanModal());
            }
          }

          break;
        case "wto-inbound":
          const wtoiResponse = await scanBarcode({
            barcode,
            category: "lpnnum_wto",
            recid: selectedItem?.recid.toString(),
            docnum: selectedDocument.docnum,
            itmcde: selectedItem.itmcde,
            untmea: selectedItem.untmea,
            lpnnum: selectedItem.lpnnum,
            itmqty: selectedItem.itmqty,
            intqty: selectedItem.intqty,
            linklpnnum: selectedItem.linklpnnum || "null",
            pdtmanualqtyinbound: receiveQty.toString(),
            linenum: selectedItem.linenum.toString(),
            usrnam: userDetails?.usrcde,
          });
          if (wtoiResponse && wtoiResponse.data.wto2_data) {
            dispatch(getWTODetails({docnum: selectedDocument.docnum}));
            dispatch(getWTO({limit: 10, offset: 0}));
            if (wtoiResponse.data.wto2_data[0]) {
              dispatch(handleSetItem(wtoiResponse.data.wto2_data[0]));
            }
            if (wtoiResponse.data.wto2_data.length === 0) {
              console.log("daan rito");
              dispatch(setStatusText(`Item Successfully Scanned.`));
              dispatch(handleToggleItemScanModal());
            }
          }
          break;
        case "wto-outbound":
          const response = await scanBarcode({
            barcode,
            category: "lpnnum_wto_outbound",
            recid: selectedItem?.recid.toString(),
            docnum: selectedDocument.docnum,
            scanlevel: barcodelvl2 ? "2" : "1",
            pdtmanualqtyoutbound: receiveQty.toString(),
            fromspl: undefined,
            spl_docnum: undefined,
            usrnam: userDetails?.usrcde,
            barcodelvl2: barcodelvl2,
          });

          console.log("bato", response);

          if (response && response.data.wto2_data) {
            dispatch(showQuantityField(true));
            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              console.log("wat", selectedDocument.docnum);
              dispatch(
                getWTOOutboundDetails({docnum: selectedDocument.docnum})
              );
              dispatch(getWTOOutboundValid({limit: 10, offset: 0}));
              dispatch(setStatusText(`Item Successfully Scanned.`));
              if (response.data.wto2_data[0]) {
                dispatch(handleSetItem(response.data.wto2_data[0]));
                // if (response.data.wto2_data[0].itmqty === 0 && receiveQty > 1) {
                //   dispatch(handleToggleOutboundItemScan());
                // }
              }
              if (response.data.wto2_data.length === 0) {
                dispatch(handleToggleOutboundItemScan());
              }
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const checkScanBarcode = async (
    uses: ScanValidate,
    {barcode, category}: ScanDocumentParams
  ) => {
    switch (uses) {
      case "pto":
        try {
          const response = await scanBarcode({barcode, category});
          handleSelectModal({item: response.data, type: uses});
          dispatch(handleToggleScanModal());
        } catch (error) {
          console.log(error);
        }
        break;
      case "pur":
        const response: any = await getLPN({lpnnum: barcode});
        console.log("ansabe", response);
        if (response) {
          dispatch(handleSetDocument(response[0]));
        }
        break;
      case "wto-inbound":
        try {
          const response = await scanBarcode({barcode, category});
          handleSelectModal({item: response.data, type: uses});
          dispatch(handleToggleScanModal());
        } catch (error) {
          console.log(error);
        }
        break;
      case "wto-outbound":
        try {
          const response = await scanBarcode({barcode, category});
          handleSelectModal({item: response.data, type: uses});
          dispatch(handleToggleScanModal());
        } catch (error) {
          console.log(error);
        }
        break;

      default:
        break;
    }
  };
  // end check categories and uses functions

  // start of  modals
  const handleSelectModal = ({item, type}: SelectProps) => {
    console.log("mga pinasa");
    console.log(type, item);
    // FETCH-DOCNUM-DETAILS-ONSELECT
    checkSelectType({item, type});
    dispatch(handleSetDocument(item));
    dispatch(handleToggleSelectModal());
    dispatch(resetStatus());
  };

  const handleScanModal = () => {
    dispatch(handleSetDocument(null));
    dispatch(resetStatus());
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

  // end of  modals

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

  const handleScanDocument = async (
    {barcode, category}: ScanDocumentParams,
    typeForFetching: ScanValidate
  ) => {
    if (!barcode) {
      Alert.alert("Empty Barcode", "Please make sure barcode is filled.", [
        {
          text: "OK",
        },
      ]);
      return;
    }
    checkScanBarcode(typeForFetching, {barcode, category});
  };

  const handleScanItem = (
    {
      barcode,
      receiveQty,
      barcodelvl2,
    }: {barcode: string; receiveQty: number; barcodelvl2?: string},
    scanUsage: ScanValidate
  ) => {
    if (!barcode || receiveQty === 0) {
      Alert.alert(
        "Empty Field",
        "Please make sure barcode and quantity is filled.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    checkScanType({barcode, receiveQty, barcodelvl2}, scanUsage);
  };

  // subject to change
  const validateBin = async (binnum: string) => {
    if (!binnum) {
      Alert.alert(
        "Empty Bin Number",
        "Please make sure bin number is filled.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    const binDetails = await getBinAndValidate({
      binnum: binnum,
      lpnnum: selectedDocument.lpnnum,
    });

    if (binDetails) {
      dispatch(handleToggleScanModal());
      dispatch(getPUR({limit: 10, offset: 0}));
      Alert.alert(
        "Validation Success",
        "Bin Number Matched. You May procceed to Manual Putaway Procedure.",
        [
          {
            text: "OK",
          },
        ]
      );
    }
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
    handleScanDocument,
    handleScanItem,
    validateBin,
    validateCycleCount,
    validatePhysicalRecord,
  };
};
