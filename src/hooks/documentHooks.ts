import { Alert, Keyboard } from "react-native";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  handleToggleScanModal,
  handleToggleSelectModal,
  handleToggleItemScanModal,
  handleToggleSearchModal,
  handleSetSearchModalContent,
  handleToggleAddBatchModal,
  handleToggleOutboundItemScan,
  handleToggleScanBinModal,
  handleSourceScanning,
  handleTargetScanning,
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
import {
  getCycleCountDetails,
  getCycleCount,
  getSLOCDetails,
  getSLOCValid,
  getSLOCPosting,
  getStockTransferDetails,
  getStockTransferPosting,
  getStockTransferValid,
} from "../store/actions/ims/transaction";
import {
  handleBinItemDetails,
  handleSetDocument,
  handleSetItem,
} from "../reducers/documentReducer";
import {
  ScanDocumentParams,
  getBinNum,
  getItem,
  getWarehouse,
} from "../store/actions/generalActions";
import { connectToPHP } from "../store/actions/generalActions";
import { resetStatus, setStatus } from "../reducers/statusReducer";
import { formatDateYYYYMMDD } from "../helper/Date";
import {
  clearBatchDetails,
  setBatchNo,
  setBatchedSaved,
  setExpDate,
  setMfgDate,
} from "../reducers/generalReducer";
import {
  getStockTODetails,
  getStockTOPosting,
  getStockTOValid,
} from "../store/actions/ims/replenishment";
import {
  getphysicalRecordDetails,
  getphysicalRecord,
} from "../store/actions/ims/physicalCount";

import { useAPIHooks } from "./apiHooks";
import { setStatusText, showQuantityField } from "../reducers/statusReducer";
import { useModalHooks } from "./modalHooks";
import { useServiceHooks } from "./serviceHooks";

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

export type SearchContent = "warehouse" | "bin" | "item";

export type TypePost =
  | "pto"
  | "pur"
  | "whs"
  | "wto-inbound"
  | "pto-add-batch"
  | "wto-outbound"
  | "wavepick"
  | "inv-singlepick"
  | "spl-singlepick"
  | "cyclecount"
  | "physical-inventory"
  | "sloc"
  | "stock-transfer"
  | "stock-replenish";

export type ScanValidate =
  | "pto"
  | "pur"
  | "whs"
  | "wto-inbound"
  | "srto"
  | "wto-outbound"
  | "wavepick"
  | "singlepick"
  | "stg-validate"
  | "cyclecount"
  | "physical-inventory"
  | "sloc"
  | "sloc-bin"
  | "stock-transfer"
  | "stock-transfer-bin"
  | "stock-replenish"
  | "stock-replenish-bin";

export type TypeSelect =
  | "pto"
  | "srto"
  | "wto-inbound"
  | "wto-outbound"
  | "wavepick"
  | "singlepick"
  | "stg-validate"
  | "cyclecount"
  | "physical-inventory"
  | "sloc"
  | "stock-transfer"
  | "stock-replenish"
  | "stock-replenish-bin";

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
  validatePost?: boolean;
}

export const useDocumentHooks = () => {
  const {
    user: { userDetails },
  } = useAppSelector((state) => state.auth);
  const { selectedDocument, selectedItem, selectedBinDetails } = useAppSelector(
    (state) => state.document
  );
  const { isQuantityFieldShown } = useAppSelector((state) => state.status);
  const {
    batchDetails: { batchNo, expDate, mfgDate },
  } = useAppSelector((state) => state.general);

  const dispatch = useAppDispatch();
  const {
    scanBarcode,
    getLPN,
    getBinAndValidate,
    connectToPHPNotDispatch,
    getCycleCount2,
    getPIRSingle,
  } = useAPIHooks();
  const { toggleEditBatchModal } = useModalHooks();
  const { handleGet, handlePatch } = useServiceHooks();

  // start check categories and uses functions

  const checkSelectType = ({ item, type }: SelectProps) => {
    console.log(type);
    switch (type) {
      case "pto":
        dispatch(getPTODetails({ docnum: item.docnum }));
        break;
      case "srto":
        dispatch(getSRTODetails({ docnum: item.docnum }));
        break;
      case "wto-inbound":
        dispatch(getWTODetails({ docnum: item.docnum }));
        break;
      case "wto-outbound":
        dispatch(getWTOOutboundDetails({ docnum: item.docnum }));
        break;
      case "wavepick":
      case "singlepick":
        dispatch(getWPTODetails({ docnum: item.docnum }));
        break;
      case "stg-validate":
        dispatch(getSTGValidateDetails({ docnum: item.docnum }));
        break;
      case "cyclecount":
        dispatch(getCycleCountDetails({ docnum: item.docnum }));
        break;
      case "sloc":
        dispatch(getSLOCDetails({ docnum: item.docnum }));
        break;
      case "stock-transfer":
        dispatch(getStockTransferDetails({ docnum: item.docnum }));
        break;
      case "stock-replenish":
        dispatch(getStockTODetails({ docnum: item.docnum }));
        break;
      case "physical-inventory":
        dispatch(
          getphysicalRecordDetails({ docnum: item.docnum, refnum: item.refnum })
        );
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
              dispatch(getPTO({ limit: 10, offset: 0 }));
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
              dispatch(getPUR({ limit: 10, offset: 0 }));
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
              dispatch(getWHS({ limit: 10, offset: 0 }));
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
              dispatch(getWTO({ limit: 10, offset: 0 }));
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
              dispatch(getPTODetails({ docnum: selectedDocument.docnum }));
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

              await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "WTO_POST",
              });

              dispatch(
                getWTOOutboundPost({
                  limit: 10,
                  offset: 0,
                })
              );

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
              await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "WPTO",
              });
              dispatch(getWPTOValid({ limit: 10, offset: 0 }));
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
              dispatch(getSPLPosting({ limit: 10, offset: 0 }));
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
      case "cyclecount":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "CC",
            onSuccess: async () => {
              console.log("dafaq");
              dispatch(getCycleCount({ limit: 10, offset: 0 }));
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
      case "sloc":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "VALIDATE_SLOC",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              const res = await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "SLOC",
              });
              if (res) {
                dispatch(
                  getSLOCPosting({
                    limit: 10,
                    offset: 0,
                  })
                );
                dispatch(setStatus("success"));
              }
            },
            onFailure: (e) => {
              console.log("wat", e);

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
      case "stock-transfer":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "BNT_SOFTVAL",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              const res = await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "BNT_POST",
              });
              if (res) {
                dispatch(
                  getStockTransferPosting({
                    limit: 10,
                    offset: 0,
                  })
                );
                dispatch(setStatus("success"));
              }
            },
            onFailure: (e) => {
              console.log("wat", e);
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
      case "stock-replenish":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            type: "VALIDATE_WHREPTO",
            onSuccess: async () => {
              dispatch(setStatus("loading"));
              const res = await connectToPHPNotDispatch({
                recid: item.recid,
                docnum: item.docnum,
                type: "WHREPTO",
              });
              if (res) {
                dispatch(
                  getStockTOPosting({
                    limit: 10,
                    offset: 0,
                  })
                );
                dispatch(setStatus("success"));
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
      case "physical-inventory":
        dispatch(
          connectToPHP({
            recid: item.recid,
            docnum: item.docnum,
            refnum: item.refnum,
            type: "VALIDATE_PIR",
            onSuccess: async (data) => {
              dispatch(setStatus("idle"));
              console.log("data", data);
              if (data && data.length > 0) {
                Alert.alert("Notification", data, [
                  {
                    text: "OK",
                    onPress: async () => {
                      dispatch(setStatus("loading"));
                      const res = await connectToPHPNotDispatch({
                        recid: item.recid,
                        docnum: item.docnum,
                        refnum: item.refnum,
                        type: "PIR",
                      });
                      await handlePatch({
                        url: "/lst_tracc/physicalcountfile31",
                        requestData: {
                          field: {
                            docnum: item.docnum,
                            refnum: item.refnum,
                          },
                          data: {
                            validate: 1,
                          },
                        },
                        disableToast: true,
                      });
                      if (res) {
                        dispatch(
                          getphysicalRecord({
                            limit: 10,
                            offset: 0,
                          })
                        );
                        dispatch(setStatus("success"));
                      }
                    },
                  },
                  {
                    text: "CANCEL",
                  },
                ]);
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
        alert("No supported yet.");
        break;
    }
  };

  // scanning item
  const checkScanType = async (
    {
      barcode,
      receiveQty,
      barcodelvl2,
      scanlevel,
    }: {
      barcode: string;
      receiveQty: number;
      barcodelvl2?: string;
      scanlevel?: string;
    },
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
            dispatch(getPTODetails({ docnum: selectedDocument.docnum }));
            dispatch(getPTO({ limit: 10, offset: 0 }));
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
            dispatch(getWTODetails({ docnum: selectedDocument.docnum }));
            dispatch(getWTO({ limit: 10, offset: 0 }));
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
            dispatch(getSRTODetails({ docnum: selectedDocument.docnum }));
            dispatch(getSRTO({ limit: 10, offset: 0 }));
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
          if (response && response.data.wto2_data) {
            dispatch(showQuantityField(true));
            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              console.log("wat", selectedDocument.docnum);
              dispatch(
                getWTOOutboundDetails({ docnum: selectedDocument.docnum })
              );
              dispatch(getWTOOutboundValid({ limit: 10, offset: 0 }));
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
            console.log("why", barcodelvl2);
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

          if (wpResponse && wpResponse.data.wpto2_data) {
            dispatch(showQuantityField(true));
            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              console.log("wat", selectedDocument.docnum);
              if (scanUsage === "singlepick") {
                dispatch(getPKValidate({ limit: 10, offset: 0 }));
              } else {
                dispatch(getWPTOValid({ limit: 10, offset: 0 }));
              }
              dispatch(getWPTODetails({ docnum: selectedDocument.docnum }));
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
            dispatch(
              getSTGValidateDetails({ docnum: selectedDocument.docnum })
            );
            dispatch(getSTGValidate({ limit: 10, offset: 0 }));
            if (stgResponse.data.spl2_data[0]) {
              dispatch(handleSetItem(stgResponse.data.spl2_data[0]));
            }
            if (stgResponse.data.spl2_data.length === 0) {
              dispatch(setStatusText(`Item Successfully Scanned.`));
              dispatch(handleToggleItemScanModal());
            }
          }
          break;
        case "cyclecount":
          const ccResponse = await scanBarcode({
            barcode,
            category: "cc_item",
            recid: selectedBinDetails?.recid.toString(),
            docnum: selectedDocument.docnum,
            scanlevel: scanlevel,
            pdtmanualqtyoutbound: receiveQty.toString(),
            usrnam: userDetails?.usrcde,
            barcodelvl2: barcodelvl2,
            scanneditem:
              scanlevel === "2.1"
                ? JSON.stringify({
                    itmcde: selectedBinDetails.itmcde,
                    itmdsc: selectedBinDetails.itmdsc,
                    untmea: selectedBinDetails.untmea,
                    itmtyp: selectedBinDetails.itmtyp,
                    binnum: selectedBinDetails.binnum,
                    batchnum: selectedBinDetails.batchnum,
                    mfgdte: selectedBinDetails.mfgdte,
                    expdte: selectedBinDetails.expdte,
                  })
                : "",
          });
          console.log("cc res", ccResponse);
          console.log("sana", selectedBinDetails);

          if (ccResponse) {
            if (ccResponse.data.item_match === false) {
              Alert.alert("Notification", `Item Barcode not Matched`, [
                {
                  text: "OK",
                },
              ]);
            }
            if (ccResponse.data.item_match) {
              toggleEditBatchModal();
            }
            if (ccResponse.data.scanned_item) {
              dispatch(setBatchedSaved(true));
              dispatch(setBatchNo(ccResponse.data.scanned_item.batchnum));
              dispatch(
                setExpDate(new Date(ccResponse.data.scanned_item.expdte))
              );
              dispatch(
                setMfgDate(new Date(ccResponse.data.scanned_item.mfgdte))
              );
            }

            if (ccResponse.data.cc2_data) {
              if (ccResponse.data.cc2_data[0]) {
                dispatch(handleBinItemDetails(ccResponse.data.cc2_data[0]));
              }
              if (ccResponse.data.cc2_data.length === 0) {
                dispatch(
                  getCycleCountDetails({ docnum: selectedDocument.docnum })
                ).then((data) => {
                  if (
                    data.payload &&
                    data.payload.totalscanned === data.payload.totalItem
                  ) {
                    dispatch(handleToggleScanBinModal());
                  }
                });
                dispatch(setStatusText(`Item Successfully Scanned.`));
                // dispatch(handleToggleScanBinModal());
              }
            }
          }

          break;
        case "sloc":
          const slocResponse = await scanBarcode({
            barcode,
            category: "sloc_item",
            scanlevel: scanlevel,
            recid: selectedItem?.recid.toString(),
            barcodelvl2: barcodelvl2,
            docnum: selectedDocument.docnum,
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: undefined,
            fromspl: undefined,
            usrnam: userDetails?.usrcde,
          });

          if (slocResponse && slocResponse.data.sloc2_data) {
            dispatch(showQuantityField(true));
            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              dispatch(
                getSLOCValid({
                  limit: 10,
                  offset: 0,
                })
              );
              dispatch(getSLOCDetails({ docnum: selectedDocument.docnum }));
              dispatch(setStatusText(`Item Successfully Scanned.`));
              if (slocResponse.data.sloc2_data[0]) {
                dispatch(handleSetItem(slocResponse.data.sloc2_data[0]));
              }
              if (slocResponse.data.sloc2_data.length === 0) {
                dispatch(setStatusText(`Item Successfully Scanned.`));
                dispatch(handleSourceScanning());
              }
            }
          }
          break;
        case "sloc-bin":
          const slocBinResponse = await scanBarcode({
            barcode,
            category: "sloc_bin",
            scanlevel: scanlevel,
            recid: selectedItem?.recid.toString(),
            barcodelvl2: barcodelvl2,
            docnum: selectedDocument.docnum,
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: undefined,
            fromspl: undefined,
            usrnam: userDetails?.usrcde,
          });

          if (slocBinResponse) {
            if (slocBinResponse.bool) {
              dispatch(
                getSLOCValid({
                  limit: 10,
                  offset: 0,
                })
              );
              dispatch(getSLOCDetails({ docnum: selectedDocument.docnum }));
              dispatch(setStatusText(`Item Successfully Va lidated.`));
              dispatch(handleTargetScanning());
            }
          }

          break;
        case "stock-transfer":
          const stResponse = await scanBarcode({
            barcode,
            category: "bnt_item",
            scanlevel: scanlevel,
            recid: selectedItem?.recid.toString(),
            barcodelvl2: barcodelvl2,
            docnum: selectedDocument.docnum,
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: undefined,
            fromspl: undefined,
            usrnam: userDetails?.usrcde,
          });
          console.log("eyuy", stResponse);

          if (stResponse && stResponse.data.bnt2_data) {
            console.log("wat is this", stResponse.data.bnt2_data);
            dispatch(showQuantityField(true));

            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              dispatch(
                getStockTransferValid({
                  limit: 10,
                  offset: 0,
                })
              );
              dispatch(
                getStockTransferDetails({ docnum: selectedDocument.docnum })
              );
              dispatch(setStatusText(`Item Successfully Scanned.`));
              if (stResponse.data.bnt2_data[0]) {
                dispatch(handleSetItem(stResponse.data.bnt2_data[0]));
              }
              if (stResponse.data.bnt2_data.length === 0) {
                dispatch(setStatusText(`Item Successfully Scanned.`));
                dispatch(handleSourceScanning());
              }
            }
          }
          break;
        case "stock-transfer-bin":
          const stBinResponse = await scanBarcode({
            barcode,
            category: "bnt_bin",
            scanlevel: scanlevel,
            recid: selectedItem?.recid.toString(),
            barcodelvl2: barcodelvl2,
            docnum: selectedDocument.docnum,
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: undefined,
            fromspl: undefined,
            usrnam: userDetails?.usrcde,
          });

          if (stBinResponse) {
            if (stBinResponse.bool) {
              dispatch(
                getStockTransferValid({
                  limit: 10,
                  offset: 0,
                })
              );
              dispatch(
                getStockTransferDetails({ docnum: selectedDocument.docnum })
              );
              dispatch(setStatusText(`Item Successfully Va lidated.`));
              dispatch(handleTargetScanning());
            }
          }
          break;
        case "stock-replenish":
          const srResponse = await scanBarcode({
            barcode,
            category: "whrepto_item",
            scanlevel: scanlevel,
            recid: selectedItem?.recid.toString(),
            barcodelvl2: barcodelvl2,
            docnum: selectedDocument.docnum,
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: undefined,
            fromspl: undefined,
            usrnam: userDetails?.usrcde,
          });
          console.log("eyuy", srResponse);

          if (srResponse && srResponse.data.whrepto2_data) {
            console.log("wat is this", srResponse.data.whrepto2_data);
            dispatch(showQuantityField(true));

            !isQuantityFieldShown &&
              dispatch(setStatusText(`Bin No. Successfully Scanned.`));
            if (isQuantityFieldShown) {
              dispatch(
                getStockTransferValid({
                  limit: 10,
                  offset: 0,
                })
              );
              dispatch(getStockTODetails({ docnum: selectedDocument.docnum }));
              dispatch(setStatusText(`Item Successfully Scanned.`));
              if (srResponse.data.whrepto2_data[0]) {
                dispatch(handleSetItem(srResponse.data.whrepto2_data[0]));
              }
              if (srResponse.data.whrepto2_data.length === 0) {
                dispatch(setStatusText(`Item Successfully Scanned.`));
                dispatch(handleSourceScanning());
              }
            }
          }
          break;
        case "stock-replenish-bin":
          const srBinResponse = await scanBarcode({
            barcode,
            category: "whrepto_bin",
            scanlevel: scanlevel,
            recid: selectedItem?.recid.toString(),
            barcodelvl2: barcodelvl2,
            docnum: selectedDocument.docnum,
            pdtmanualqtyoutbound: receiveQty.toString(),
            spl_docnum: undefined,
            fromspl: undefined,
            usrnam: userDetails?.usrcde,
          });

          console.log(srBinResponse);

          if (srBinResponse) {
            if (srBinResponse.bool) {
              dispatch(
                getStockTOValid({
                  limit: 10,
                  offset: 0,
                })
              );
              dispatch(getStockTODetails({ docnum: selectedDocument.docnum }));
              dispatch(setStatusText(`Item Successfully Va lidated.`));
              dispatch(handleTargetScanning());
            }
          }
          break;

        case "physical-inventory":
          const pirResponse = await scanBarcode({
            barcode,
            category: "pir_item",
            recid: selectedBinDetails?.recid.toString(),
            docnum: selectedDocument.docnum,
            refnum: selectedDocument.refnum,
            scanlevel: scanlevel,
            pdtmanualqtyoutbound: receiveQty.toString(),
            usrnam: userDetails?.usrcde,
            barcodelvl2: barcodelvl2,
            scanneditem:
              scanlevel === "2.1"
                ? JSON.stringify({
                    itmcde: selectedBinDetails.itmcde,
                    itmdsc: selectedBinDetails.itmdsc,
                    untmea: selectedBinDetails.untmea,
                    itmtyp: selectedBinDetails.itmtyp,
                    binnum: selectedBinDetails.binnum,
                    batchnum: selectedBinDetails.batchnum,
                    mfgdte: selectedBinDetails.mfgdte,
                    expdte: selectedBinDetails.expdte,
                  })
                : "",
          });
          console.log("pir res", pirResponse);
          console.log("sana", selectedBinDetails);

          if (pirResponse) {
            if (pirResponse.data.item_match === false) {
              Alert.alert("Notification", `Item Barcode not Matched`, [
                {
                  text: "OK",
                },
              ]);
            }
            if (pirResponse.data.item_match) {
              toggleEditBatchModal();
            }
            if (pirResponse.data.scanned_item) {
              dispatch(setBatchedSaved(true));
              dispatch(setBatchNo(pirResponse.data.scanned_item.batchnum));
              dispatch(
                setExpDate(new Date(pirResponse.data.scanned_item.expdte))
              );
              dispatch(
                setMfgDate(new Date(pirResponse.data.scanned_item.mfgdte))
              );
            }

            if (pirResponse.data.pir2_data) {
              if (pirResponse.data.pir2_data[0]) {
                dispatch(handleBinItemDetails(pirResponse.data.pir2_data[0]));
              }
              if (pirResponse.data.pir2_data.length === 0) {
                dispatch(
                  getphysicalRecordDetails({
                    docnum: selectedDocument.docnum,
                    refnum: selectedDocument.refnum,
                  })
                ).then((data) => {
                  if (
                    data.payload &&
                    data.payload.totalscanned === data.payload.totalItem
                  ) {
                    dispatch(handleToggleScanBinModal());
                  }
                });
                dispatch(setStatusText(`Item Successfully Scanned.`));
              }
            }
          }
          break;

        default:
          alert("no api yet");
          break;
      }
    }
  };

  // search using barcode for searching
  const checkScanBarcode = async (
    uses: ScanValidate,
    { barcode, category }: ScanDocumentParams
  ) => {
    switch (uses) {
      case "pur":
      case "whs":
        const lpnResponse: any = await getLPN({ lpnnum: barcode, usage: uses });
        if (lpnResponse) {
          dispatch(handleSetDocument(lpnResponse[0]));
        }
        break;
      case "pto":
      case "wto-inbound":
      case "srto":
      case "wto-outbound":
      case "wavepick":
      case "cyclecount":
      case "physical-inventory":
        const response = await scanBarcode({ barcode, category });
        if (response) {
          handleSelectModal({ item: response.data, type: uses });
          dispatch(handleToggleScanModal());
        }
        break;
      case "singlepick":
        const spResponse = await scanBarcode({ barcode, category }, true);
        if (spResponse) {
          dispatch(handleToggleScanModal());
          if (spResponse.data.for_posting_stg || spResponse.data.for_posting) {
            switch (spResponse.data.page) {
              case "WPL":
                break;
              case "SPL":
                handlePost({ item: spResponse.data, type: "spl-singlepick" });
                break;
            }
            return;
          }
          switch (spResponse.data.page) {
            case "WPL":
              handleSelectModal({ item: spResponse.data, type: "singlepick" });
              break;
            case "SPL":
              handleSelectModal({
                item: spResponse.data,
                type: "stg-validate",
              });
              break;
          }
        }
        break;
      case "sloc":
        const slocResponse = await scanBarcode({ barcode, category }, true);
        if (slocResponse) {
          console.log("sloc shit", slocResponse);
          dispatch(handleToggleScanModal());
          if (slocResponse.data.for_posting) {
            console.log("posting");
            handlePost({ item: slocResponse.data, type: "sloc" });
          } else {
            console.log("not here");
            handleSelectModal({ item: slocResponse.data, type: uses });
          }
        }
        break;
      case "stock-transfer":
        const stResponse = await scanBarcode({ barcode, category }, true);
        console.log("stock transfer shit", stResponse);

        if (stResponse) {
          dispatch(handleToggleScanModal());

          if (stResponse.data.for_posting) {
            console.log("posting");
            handlePost({ item: stResponse.data, type: "stock-replenish" });
          } else {
            handleSelectModal({ item: stResponse.data, type: uses });
          }
        }
        break;
      case "stock-replenish":
        const srResponse = await scanBarcode({ barcode, category }, true);
        console.log("stock transfer shit", stResponse);

        if (srResponse) {
          dispatch(handleToggleScanModal());

          if (srResponse.data.for_posting) {
            console.log("posting");
            handlePost({
              item: srResponse.data,
              type: "stock-replenish",
              validatePost: true,
            });
          } else {
            handleSelectModal({ item: srResponse.data, type: uses });
          }
        }
        break;

      default:
        alert("no scan barcode api");
        break;
    }
  };

  const checkValidate = async ({ item, type }: PostProps) => {
    switch (type) {
      case "stock-replenish":
        await handleGet({
          url: `/lst_tracc/stockreplenishmenttofile1?recid=${item.recid}&docnum=${item.docnum}&_limit=1`,
          disableToast: true,
          onSuccess(data) {
            if (data[0].posted === 1) {
              dispatch(setStatus("idle"));
              Alert.alert("Duplication Posting", "Document Already Posted", [
                {
                  text: "OK",
                },
              ]);
              return;
            }
            handlePost({ item: item, type: type });
          },
        });
        break;

      default:
        break;
    }
  };

  // end check categories and uses functions

  // start of  modals
  const handleSelectModal = ({ item, type }: SelectProps) => {
    console.log("wat type", item, type);

    // FETCH-DOCNUM-DETAILS-ONSELECT
    checkSelectType({ item, type });
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
    switch (content) {
      case "warehouse":
        dispatch(getWarehouse({ limit: 10, offset: 0 }));
        break;
      case "item":
        dispatch(getItem({ limit: 10, offset: 0 }));
        break;
      case "bin":
        dispatch(getBinNum({ limit: 10, offset: 0 }));
        break;
      default:
        break;
    }
    dispatch(handleToggleSearchModal());
    dispatch(handleSetSearchModalContent(content));
    dispatch(resetStatus());
  };

  const closeItemScanModal = () => {
    dispatch(handleToggleItemScanModal());
    dispatch(resetStatus());
  };
  // end of  modals

  const handlePost = ({
    item,
    type,
    customMessage,
    validatePost,
  }: PostProps) => {
    if (validatePost) {
      checkValidate({ item, type });
    } else if (customMessage) {
      Alert.alert(`${customMessage.header}`, `${customMessage.body}`, [
        {
          text: "Yes",
          onPress: () => {
            checkPostType(item, type);
          },
          style: "destructive",
        },
        { text: "No", style: "cancel" },
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
          { text: "No", style: "cancel" }, // Just close the alert without any action
        ]
      );
    }
  };

  const handleScanDocument = async (
    { barcode, category }: ScanDocumentParams,
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
    checkScanBarcode(typeForFetching, { barcode, category });
  };

  const handleScanItem = (
    {
      barcode,
      receiveQty,
      barcodelvl2,
      customMessage,
      scanlevel,
    }: {
      barcode: string;
      receiveQty: number;
      barcodelvl2?: string;
      customMessage?: string;
      scanlevel?: string;
    },
    scanUsage: ScanValidate
  ) => {
    console.log("wat", barcode, receiveQty, scanUsage);

    if (!barcode || receiveQty === 0) {
      Alert.alert(
        "Empty Field",
        customMessage || "Please make sure barcode and quantity is filled.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    checkScanType({ barcode, receiveQty, barcodelvl2, scanlevel }, scanUsage);
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
          dispatch(getPUR({ limit: 10, offset: 0 }));
          break;
        case "whs":
          dispatch(getWHS({ limit: 10, offset: 0 }));
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

  const validateCycleCount = async (item: any) => {
    const cyclecount = await getCycleCount2(item.docnum, item.recid);

    Alert.alert("Validation", `Do you want to validate '${item.docnum}'`, [
      {
        text: "Yes",
        onPress: () => checkPostType(cyclecount[0], "cyclecount"),
        style: "destructive",
      },
      { text: "No", style: "cancel" }, // Just close the alert without any action
    ]);
  };

  const validatePhysicalRecord = async (item: any) => {
    console.log("item", item);

    // const pir = await getPIRSingle(item.docnum, item.recid, item.refnum);
    Alert.alert("Validation", `Do you want to validate '${item.refnum}'`, [
      {
        text: "Yes",
        onPress: () => checkPostType(item, "physical-inventory"),
      },
      { text: "No", style: "cancel" }, // Just close the alert without any action
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
