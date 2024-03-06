import {useAppSelector, AppDispatch, useAppDispatch} from "../store/store";
import {useEffect, useState} from "react";

import {
  handleToggleAddBatchModal,
  handleToggleEditBatchModal,
  handleToggleSearchBatchModal,
} from "../reducers/modalReducer";
import {handleSetBatchItem} from "../reducers/documentReducer";
import {getBatch, connectToPHP} from "../store/actions/generalActions";
import {
  setMfgDate,
  setBatchNo,
  setExpDate,
  clearBatchDetails,
} from "../reducers/generalReducer";

interface BatchProps {
  uses: "update" | "create" | "modals";
}

export const useBatchHooks = ({uses}: BatchProps) => {
  const {selectedBatchItem} = useAppSelector((state) => state.document);
  const {
    batchDetails: {batchNo, expDate, mfgDate},
  } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const [saved, setSaved] = useState(false);

  const handleMfgDate = (newDate: any) => {
    console.log(newDate);
    dispatch(setMfgDate(newDate));
  };
  const handleExpDate = (newDate: any) => {
    console.log(newDate);
    dispatch(setExpDate(newDate));
  };
  const handleBatchNo = (batch: any) => {
    console.log(batch);
    setSaved(true);
    dispatch(setBatchNo(batch.batchnum));
    dispatch(setExpDate(new Date(batch.expdte)));
    dispatch(setMfgDate(new Date(batch.mfgdte)));
    handleCloseSearchBatchModal();
  };

  const handleSave = () => {
    setSaved(true);
    handleCloseEditBatchModal();
  };

  const handleClose = () => {
    handleCloseEditBatchModal();
    setSaved(false);
    dispatch(clearBatchDetails());
  };

  // modals
  const handleAddBatchModal = (item: any) => {
    dispatch(handleToggleAddBatchModal());
    dispatch(handleSetBatchItem(item));
  };
  const handleCloseAddBatchModal = () => {
    dispatch(handleToggleAddBatchModal());
  };
  const handleEditBatchModal = (item: any) => {
    switch (uses) {
      case "create":
        dispatch(clearBatchDetails());
        break;
      case "update":
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
    saved,
    handleMfgDate,
    handleExpDate,
    handleBatchNo,
    handleSave,
    handleClose,
    // modals
    handleAddBatchModal,
    handleEditBatchModal,
    handleSearchBatchModal,
    handleCloseAddBatchModal,
    handleCloseEditBatchModal,
    handleCloseSearchBatchModal,
  };
};
