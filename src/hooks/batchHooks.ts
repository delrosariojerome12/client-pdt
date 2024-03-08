import {useAppSelector, useAppDispatch} from "../store/store";
import {Alert} from "react-native";
import {getPTODetails} from "../store/actions/warehouse/warehouseActions";
import {
  handleToggleAddBatchModal,
  handleToggleEditBatchModal,
  handleToggleSearchBatchModal,
} from "../reducers/modalReducer";
import {handleSetBatchItem} from "../reducers/documentReducer";
import {
  getBatch,
  updateBatch,
  deleteScanQuantity,
} from "../store/actions/generalActions";
import {
  setMfgDate,
  setBatchNo,
  setExpDate,
  clearBatchDetails,
  setBatchedSaved,
  setBatchPostMode,
} from "../reducers/generalReducer";
import {useDocumentHooks} from "./documentHooks";
import {formatDateYYYYMMDD} from "../helper/Date";
import {setStatusText} from "../reducers/statusReducer";
import {useAPIHooks} from "./apiHooks";
type Uses = "update" | "create";

export const useBatchHooks = () => {
  const {selectedBatchItem, selectedDocument} = useAppSelector(
    (state) => state.document
  );
  const {
    batchDetails: {batchNo, expDate, mfgDate, batchedSaved},
  } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();
  const {handlePost} = useDocumentHooks();
  const {connectToPHPNotDispatch} = useAPIHooks();

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
                  data: {doclock: "Y", pdtopen: "Y"},
                  field: {docnum: selectedDocument.batchnum},
                },
                item: {
                  field: {
                    lpnnum: selectedBatchItem.lpnnum,
                  },
                  data: {
                    batchnum: batchNo,
                    expdte: formatDateYYYYMMDD(expDate),
                    mdgdte: formatDateYYYYMMDD(mfgDate),
                  },
                },
                onSuccess: () => {
                  dispatch(
                    setStatusText(
                      ` '${selectedBatchItem.lpnnum}': Batch Details Successfully Updated.`
                    )
                  );
                  handleCloseEditBatchModal();
                  dispatch(getPTODetails({docnum: selectedDocument.docnum}));
                },
              })
            );
          },
        },
        {text: "No", style: "cancel"},
      ]
    );
  };

  const removeScannedQuantity = (item: any) => {
    // clear scanned items
    Alert.alert(
      "Remove Scanned Quantity",
      `Are you sure you want to remove the scanned quantity of item: '${item.itmdsc}'`,
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(
              deleteScanQuantity({
                document: {
                  data: {doclock: "Y", pdtopen: "Y"},
                  field: {docnum: selectedDocument.docnum},
                },
                item: {
                  data: {itmqty: 0},
                  field: {recid: item.recid},
                },
                lpnnum: item.lpnnum,
                onSuccess: () => {
                  dispatch(
                    setStatusText(`Scanned Quantity Removed: '${item.lpnnum}'`)
                  );
                  dispatch(getPTODetails({docnum: selectedDocument.docnum}));
                  connectToPHPNotDispatch({
                    recid: item.recid,
                    docnum: selectedDocument.docnum,
                    type: "rearrangelinennum",
                  });
                },
              })
            );
          },
          style: "destructive",
        },
        {text: "No", style: "cancel"},
      ]
    );
  };

  // const handleClose = () => {
  //   handleCloseEditBatchModal();
  //   // setSaved(false);
  //   dispatch(setBatchedSaved(false));
  //   dispatch(clearBatchDetails());
  // };

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
    dispatch(
      getBatch({limit: 10, offset: 0, itmcde: selectedBatchItem.itmcde})
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
  };
};
