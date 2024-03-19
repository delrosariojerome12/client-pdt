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
  getSRTO,
  getWHS,
  getWPTOValid,
  getPKValidate,
  getSPLPosting,
  getINVPosting,
  getSTGValidate,
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
  | "wto-outbound"
  | "wavepick"
  | "inv-singlepick"
  | "spl-singlepick";

export type ScanValidate =
  | "pto"
  | "pur"
  | "whs"
  | "wto-inbound"
  | "srto"
  | "wto-outbound"
  | "wavepick"
  | "singlepick"
  | "stg-validate";

export type TypeSelect =
  | "pto"
  | "srto"
  | "wto-inbound"
  | "wto-outbound"
  | "wavepick"
  | "singlepick"
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
      case "singlepick":
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
      case "whs":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.intnum,
            type: "PTAWHS",
            onSuccess: () => {
              dispatch(getWHS({limit: 10, offset: 0}));
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
      case "wavepick":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "VALIDATE_WPL",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              console.log("loading muna");
              await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "WPTO",
              });
              console.log("dito sunod");
              dispatch(getWPTOValid({limit: 10, offset: 0}));
              console.log("tapos na");
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
      case "spl-singlepick":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "SPL",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              dispatch(getSPLPosting({limit: 10, offset: 0}));
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
      case "inv-singlepick":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "VALIDATE_WPL",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              const response = await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "INVPOST",
              });
              dispatch(
                getINVPosting({
                  limit: 10,
                  offset: 0,
                })
              );
              if (response) {
                dispatch(setStatus("success"));
              } else {
                dispatch(setStatus("failed"));
              }
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
        case "srto":
          const srtoResponse = await scanBarcode({
            barcode,
            category: "lpnnum_srto",
            recid: selectedItem?.recid.toString(),
            docnum: selectedDocument.docnum,
            itmcde: selectedItem.itmcde,
            untmea: selectedItem.untmea,
            itmqty: selectedItem.itmqty,
            srtqty: selectedItem.srtqty,
            pdtmanualqtyinbound: receiveQty.toString(),
            linenum: selectedItem.linenum.toString(),
            usrnam: userDetails?.usrcde,
          });
          if (srtoResponse && srtoResponse.data.srto2_data) {
            dispatch(getSRTODetails({docnum: selectedDocument.docnum}));
            dispatch(getSRTO({limit: 10, offset: 0}));
            if (srtoResponse.data.srto2_data[0]) {
              dispatch(handleSetItem(srtoResponse.data.srto2_data[0]));
            }
            if (srtoResponse.data.srto2_data.length === 0) {
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
              }
              if (response.data.wto2_data.length === 0) {
                dispatch(handleToggleOutboundItemScan());
              }
            }
          }
          break;
        case "wavepick":
        case "singlepick":
          if (barcodelvl2 !== "") {
            dispatch(setStatus("loading"));
            const response = await connectToPHPNotDispatch({
              recid: selectedDocument.recid,
              docnum: selectedDocument.docnum,
              type: "chk_binbatch_onhand",
            });

            if (parseFloat(response.finalyqty) < receiveQty) {
              Alert.alert(
                "Something went wrong",
                "The requested qty. exceeded the onhand qty.",
                [
                  {
                    text: "OK",
                  },
                ]
              );
              return;
            }
          }
          const wpResponse = await scanBarcode({
            barcode,
            category: "wpto_item",
            recid: selectedItem?.recid.toString(),
            docnum: selectedDocument.docnum,
            scanlevel: barcodelvl2 ? "2" : "1",
            pdtmanualqtyoutbound: receiveQty.toString(),
            fromspl: scanUsage === "singlepick" ? "1" : undefined,
            spl_docnum: selectedDocument.docnum,
            usrnam: userDetails?.usrcde,
            barcodelvl2: barcodelvl2,
          });
          console.log("bato", wpResponse);
          if (wpResponse && wpResponse.data.wpto2_data) {
            dispatch(showQuantityField(true));
            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              console.log("wat", selectedDocument.docnum);
              if (scanUsage === "singlepick") {
                dispatch(getPKValidate({limit: 10, offset: 0}));
              } else {
                dispatch(getWPTOValid({limit: 10, offset: 0}));
              }
              dispatch(getWPTODetails({docnum: selectedDocument.docnum}));
              dispatch(setStatusText(`Item Successfully Scanned.`));
              if (wpResponse.data.wpto2_data[0]) {
                dispatch(handleSetItem(wpResponse.data.wpto2_data[0]));
              }
              if (wpResponse.data.wpto2_data[0].validated === 1) {
                dispatch(handleToggleOutboundItemScan());
              }
            }
          }
          break;
        case "stg-validate":
          const stgResponse = await scanBarcode({
            barcode,
            category: "spl_item",
            recid: selectedItem?.recid.toString(),
            docnum: selectedDocument.docnum,
            scanlevel: "1",
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: selectedDocument.docnum,
            usrnam: userDetails?.usrcde,
          });
          if (stgResponse && stgResponse.data.spl2_data) {
            dispatch(getSTGValidateDetails({docnum: selectedDocument.docnum}));
            dispatch(getSTGValidate({limit: 10, offset: 0}));
            if (stgResponse.data.spl2_data[0]) {
              dispatch(handleSetItem(stgResponse.data.spl2_data[0]));
            }
            if (stgResponse.data.spl2_data.length === 0) {
              dispatch(setStatusText(`Item Successfully Scanned.`));
              dispatch(handleToggleItemScanModal());
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
      case "pur":
      case "whs":
        const lpnResponse: any = await getLPN({lpnnum: barcode, usage: uses});
        if (lpnResponse) {
          dispatch(handleSetDocument(lpnResponse[0]));
        }
        break;
      case "pto":
      case "wto-inbound":
      case "srto":
      case "wto-outbound":
      case "wavepick":
        const response = await scanBarcode({barcode, category});
        if (response) {
          handleSelectModal({item: response.data, type: uses});
          dispatch(handleToggleScanModal());
        }
        break;
      case "singlepick":
        const spResponse = await scanBarcode({barcode, category}, true);
        if (spResponse) {
          dispatch(handleToggleScanModal());
          console.log("dito daapat");
          console.log(spResponse.data);

          if (spResponse.data.for_posting_stg || spResponse.data.for_posting) {
            switch (spResponse.data.page) {
              case "WPL":
                alert("eto na");
                break;
              case "SPL":
                handlePost({item: spResponse.data, type: "spl-singlepick"});
                break;
            }
            return;
          }
          switch (spResponse.data.page) {
            case "WPL":
              handleSelectModal({item: spResponse.data, type: "singlepick"});
              break;
            case "SPL":
              handleSelectModal({
                item: spResponse.data,
                type: "stg-validate",
              });
              break;
          }
        }

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
  const validateBin = async (binnum: string, usage: ScanValidate) => {
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

    let patchUrl = "";
    switch (usage) {
      case "pur":
        patchUrl = "lst_tracc/purchasetofile2";
        break;
      case "whs":
        patchUrl = "lst_tracc/warehousetransferorderfile2";
        break;

      default:
        break;
    }

    const binDetails = await getBinAndValidate({
      binnum: binnum,
      lpnnum: selectedDocument.lpnnum,
      patchUrl: patchUrl,
    });

    if (binDetails) {
      dispatch(handleToggleScanModal());
      switch (usage) {
        case "pur":
          dispatch(getPUR({limit: 10, offset: 0}));
          break;
        case "whs":
          dispatch(getWHS({limit: 10, offset: 0}));
          break;

        default:
          break;
      }
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
