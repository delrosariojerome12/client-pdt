import { useAppSelector, useAppDispatch } from "../store/store";
import { Alert } from "react-native";
import {
  getPTODetails,
  getPTO,
  getWTOOutboundDetails,
  getWTOOutboundValid,
  getWTO,
  getWTODetails,
  getSRTO,
  getSRTODetails,
  getWPTODetails,
  getWPTOValid,
  getPKValidate,
  getINVPosting,
  getSPLPosting,
  getSTGValidate,
  getSTGValidateDetails,
} from "../store/actions/warehouse/warehouseActions";
import {
  handleToggleAddBatchModal,
  handleToggleEditBatchModal,
  handleToggleSearchBatchModal,
} from "../reducers/modalReducer";
import { handleSetBatchItem } from "../reducers/documentReducer";
import { getBatch, updateBatch } from "../store/actions/generalActions";
import {
  setMfgDate,
  setBatchNo,
  setExpDate,
  clearBatchDetails,
  setBatchedSaved,
  setBatchPostMode,
} from "../reducers/generalReducer";
import {
  togglePendingAndScan,
  getCycleCountDetails,
  getCycleCount,
  getSLOCValid,
  getSLOCDetails,
  getStockTransferValid,
  getStockTransferDetails,
} from "../store/actions/ims/transaction";
import { useDocumentHooks } from "./documentHooks";
import { formatDateYYYYMMDD } from "../helper/Date";
import { setStatus, setStatusText } from "../reducers/statusReducer";
import { useAPIHooks } from "./apiHooks";
import { TypeSelect } from "./documentHooks";

type Uses = "update" | "create";

export const useBatchHooks = () => {
  const { selectedBatchItem, selectedDocument, selectedBinDetails } =
    useAppSelector((state) => state.document);
  const {
    batchDetails: { batchNo, expDate, mfgDate, batchedSaved },
  } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();
  const { handlePost } = useDocumentHooks();
  const { connectToPHPNotDispatch, removeScannedQuantityService } =
    useAPIHooks();

  // on remove then load
  const checkDetailsToReload = (detailsToLoad: TypeSelect) => {
    console.log("gamit", detailsToLoad);

    switch (detailsToLoad) {
      case "pto":
        dispatch(getPTODetails({ docnum: selectedDocument.docnum }));
        dispatch(getPTO({ limit: 10, offset: 0 }));
        break;
      case "wto-inbound":
        dispatch(getWTODetails({ docnum: selectedDocument.docnum }));
        dispatch(getWTO({ limit: 10, offset: 0 }));
        break;
      case "wto-outbound":
        dispatch(getWTOOutboundDetails({ docnum: selectedDocument.docnum }));
        dispatch(getWTOOutboundValid({ limit: 10, offset: 0 }));
        break;
      case "srto":
        dispatch(getSRTODetails({ docnum: selectedDocument.docnum }));
        dispatch(getSRTO({ limit: 10, offset: 0 }));
        break;
      case "wavepick":
        dispatch(getWPTOValid({ limit: 10, offset: 0 }));
        dispatch(getWPTODetails({ docnum: selectedDocument.docnum }));
        break;
      case "singlepick":
        dispatch(getWPTODetails({ docnum: selectedDocument.docnum }));
        dispatch(getPKValidate({ limit: 10, offset: 0 }));
        break;
      case "stg-validate":
        dispatch(getSTGValidate({ limit: 10, offset: 0 }));
        dispatch(getSTGValidateDetails({ docnum: selectedDocument.docnum }));
        break;
      case "cyclecount":
        dispatch(getCycleCount({ limit: 10, offset: 0 }));
        dispatch(getCycleCountDetails({ docnum: selectedDocument.docnum }));
        break;
      case "sloc":
        dispatch(getSLOCValid({ limit: 10, offset: 0 }));
        dispatch(getSLOCDetails({ docnum: selectedDocument.docnum }));
        break;
      case "stock-transfer":
        dispatch(getStockTransferValid({ limit: 10, offset: 0 }));
        dispatch(getStockTransferDetails({ docnum: selectedDocument.docnum }));
        break;

      default:
        break;
    }
  };

  interface Endpoint {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    payload?: any;
  }

  const checkRemove = async (uses: TypeSelect, item: any) => {
    console.log(uses);
    switch (uses) {
      case "pto":
        const ptoEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/purchasetofile1`,
            payload: {
              data: { doclock: "Y", pdtopen: "Y" },
              field: { docnum: selectedDocument.docnum },
            },
          },
          {
            method: "PATCH",
            url: `lst_tracc/purchasetofile2`,
            payload: {
              data: { itmqty: 0 },
              field: { recid: item.recid },
            },
          },
          {
            method: "DELETE",
            url: `/lst_tracc/purchasetofile2?linklpnnum=${item.lpnnum}`,
          },
        ];
        const ptoResponse = await removeScannedQuantityService(
          ptoEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
            connectToPHPNotDispatch({
              recid: item.recid,
              docnum: selectedDocument.docnum,
              type: "rearrangelinennum",
            });
          }
        );
        // console.log("wat da hel", ptoResponse);
        break;
      case "wto-outbound":
        const wtoEndpoints: Endpoint[] = [
          {
            method: "GET",
            url: `lst_tracc/warehousetransferorderfile2?recid=${item.recid}&_includes=docnum,validate`,
          },
          {
            method: "PATCH",
            url: `lst_tracc/warehousetransferorderfile2`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                scanqty: 0,
              },
            },
          },
          {
            method: "PATCH",
            url: `lst_tracc/warehousetransferorderfile1`,
            payload: {
              field: {
                docnum: selectedDocument.docnum,
              },
              data: {
                doclock: "Y",
              },
            },
          },
        ];
        const wtoResponse = await removeScannedQuantityService(
          wtoEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );
        // console.log("wat da hel", wtoResponse);
        break;
      case "wto-inbound":
        const wtoInboundEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/warehousetransferorderfile2`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                intqty: 0,
              },
            },
          },
          {
            method: "PATCH",
            url: `lst_tracc/warehousetransferorderfile1`,
            payload: {
              field: {
                docnum: selectedDocument.docnum,
              },
              data: {
                doclock: "Y",
              },
            },
          },
        ];
        const wtoInboundResponse = await removeScannedQuantityService(
          wtoInboundEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );
        break;
      case "srto":
        const srtoEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/salesreturntofile2`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                srtqty: 0,
              },
            },
          },
          {
            method: "PATCH",
            url: `lst_tracc/salesreturntofile1`,
            payload: {
              field: {
                docnum: selectedDocument.docnum,
              },
              data: {
                doclock: "Y",
              },
            },
          },
        ];
        const srtoResponse = await removeScannedQuantityService(
          srtoEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );
        break;
      case "wavepick":
      case "singlepick":
        const wptoEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/wavepicklistfile2`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                scanqty: 0,
              },
            },
          },
          {
            method: "PATCH",
            url: `lst_tracc/wavepicklistfile1`,
            payload: {
              field: {
                docnum: selectedDocument.docnum,
              },
              data: {
                doclock: "Y",
              },
            },
          },
        ];
        const wptoResponse = await removeScannedQuantityService(
          wptoEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );
        break;
      case "stg-validate":
        const stgEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/singlepicklistfile2`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                scanqty: 0,
              },
            },
          },
        ];
        const stgResponse = await removeScannedQuantityService(
          stgEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );

        break;
      case "cyclecount":
        const ccEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/cyclecountfile2`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                stritmqty: "",
                itmqty: 0,
                pstritmqty: "0",
              },
            },
          },
        ];
        const ccResponse = await removeScannedQuantityService(
          ccEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );
        break;
      case "sloc":
        if (item.validated === 1) {
          Alert.alert(
            "Removing Quantity",
            "Cannot Remove quantity of already validated item."
          );
          return;
        }
        const slocEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/storagelocationtransferfile2b`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                scanqty: 0,
              },
            },
          },
        ];
        const slocResponse = await removeScannedQuantityService(
          slocEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );
        break;
      case "stock-transfer":
        if (item.validated === 1) {
          Alert.alert(
            "Removing Quantity",
            "Cannot Remove quantity of already validated item."
          );
          return;
        }
        const stEndpoints: Endpoint[] = [
          {
            method: "PATCH",
            url: `lst_tracc/inventorytranfile2b`,
            payload: {
              field: {
                recid: item.recid,
              },
              data: {
                scanqty: 0,
              },
            },
          },
        ];
        const stResponse = await removeScannedQuantityService(
          stEndpoints,
          () => {
            checkDetailsToReload(uses);
            dispatch(setStatusText(`Scanned Quantity Removed Successfully.`));
          }
        );

        break;
      default:
        alert("Remove not supported");
        break;
    }
  };

  const handleMfgDate = (newDate: any) => {
    dispatch(setMfgDate(newDate));
  };
  const handleExpDate = (newDate: any) => {
    dispatch(setExpDate(newDate));
  };
  const handleBatchNo = (batch: any) => {
    dispatch(setBatchedSaved(true));
    dispatch(setBatchNo(batch.batchnum));
    dispatch(setExpDate(new Date(batch.expdte)));
    dispatch(setMfgDate(new Date(batch.mfgdte)));
    handleCloseSearchBatchModal();
  };

  const handleSaveUpdateBatch = () => {
    dispatch(setBatchedSaved(true));
    dispatch(handleToggleEditBatchModal());
    dispatch(setStatus("idle"));
  };

  const handlePostAnotherBatch = () => {
    if (!batchNo) {
      Alert.alert(`Cannot Save!`, `Please fill Batch number first.`, [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    } else {
      dispatch(setStatusText(`New Batch Added Successfully.`));
      handlePost({
        item: selectedBatchItem,
        type: "pto-add-batch",
        customMessage: {
          header: "Add Another PTO Batch Saving",
          body: "Do you want to save this details?",
        },
      });
    }
  };
  const handlePostUpdateBatch = () => {
    Alert.alert(
      `Batch Details Update Posting`,
      `Do you want to update this batch details of: '${selectedBatchItem.lpnnum}'`,
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(setBatchedSaved(true));

            dispatch(
              updateBatch({
                document: {
                  data: { doclock: "Y", pdtopen: "Y" },
                  field: { docnum: selectedDocument.docnum },
                },
                item: {
                  field: {
                    lpnnum: selectedBatchItem.lpnnum,
                  },
                  data: {
                    batchnum: batchNo,
                    expdte: formatDateYYYYMMDD(expDate),
                    mfgdte: formatDateYYYYMMDD(mfgDate),
                  },
                },
                onSuccess: () => {
                  dispatch(
                    setStatusText(
                      ` '${selectedBatchItem.lpnnum}': Batch Details Successfully Updated.`
                    )
                  );
                  handleCloseEditBatchModal();
                  dispatch(getPTODetails({ docnum: selectedDocument.docnum }));
                },
              })
            );
          },
        },
        { text: "No", style: "cancel" },
      ]
    );
  };

  const removeScannedQuantity = (item: any, detailsToLoad: TypeSelect) => {
    console.log(detailsToLoad);

    Alert.alert(
      "Remove Scanned Quantity",
      `Are you sure you want to remove the scanned quantity of item: '${item.itmdsc}' ?`,
      [
        {
          text: "Yes",
          onPress: () => {
            checkRemove(detailsToLoad, item);
          },
          style: "destructive",
        },
        { text: "No", style: "cancel" },
      ]
    );
  };
  const handleCheckPendingScan = (
    showPending: boolean,
    showScanned: boolean
  ) => {
    dispatch(
      togglePendingAndScan({
        docnum: selectedDocument.docnum,
        showPending,
        showScanned,
      })
    );
  };

  // modals
  const handleAddBatchModal = (item: any) => {
    dispatch(setBatchPostMode("updateBatch"));
    dispatch(handleToggleAddBatchModal());
    dispatch(handleSetBatchItem(item));
  };
  const handleCloseAddBatchModal = () => {
    dispatch(setBatchedSaved(false));
    dispatch(handleToggleAddBatchModal());
    dispatch(clearBatchDetails());
  };

  const handleEditBatchModal = (item: any, uses: Uses) => {
    switch (uses) {
      case "create":
        dispatch(clearBatchDetails());
        break;
      case "update":
        dispatch(setBatchPostMode("postUpdateBatch"));
        dispatch(setBatchNo(item.batchnum));
        dispatch(setMfgDate(new Date(item.mfgdte)));
        dispatch(setExpDate(new Date(item.expdte)));
        break;
      default:
        break;
    }
    dispatch(handleToggleEditBatchModal());
    dispatch(handleSetBatchItem(item));
  };
  const handleCloseEditBatchModal = () => {
    dispatch(handleToggleEditBatchModal());
    dispatch(setBatchedSaved(false));
    dispatch(clearBatchDetails());
  };
  const handleSearchBatchModal = () => {
    console.log("nyare", selectedBinDetails.itmcde);
    console.log(selectedBatchItem);

    dispatch(
      getBatch({
        limit: 10,
        offset: 0,
        itmcde: selectedBinDetails.itmcde || selectedBatchItem.itmcde,
      })
    );
    dispatch(handleToggleSearchBatchModal());
  };
  const handleCloseSearchBatchModal = () => {
    dispatch(handleToggleSearchBatchModal());
  };

  return {
    batchNo,
    expDate,
    mfgDate,
    batchedSaved,
    handleMfgDate,
    handleExpDate,
    handleBatchNo,
    // handleClose,
    handleSaveUpdateBatch,
    // modals
    handleAddBatchModal,
    handleEditBatchModal,
    handleSearchBatchModal,
    handleCloseAddBatchModal,
    handleCloseEditBatchModal,
    handleCloseSearchBatchModal,
    // api call
    handlePostAnotherBatch,
    handlePostUpdateBatch,
    removeScannedQuantity,
    handleCheckPendingScan,
  };
};
