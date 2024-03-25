import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useEffect, useCallback } from "react";
import { ToastMessage } from "../helper/Toast";
import {
  getCycleCount,
  getSLOCPosting,
  getSLOCValid,
  getStockTransferPosting,
  getStockTransferValid,
} from "../store/actions/ims/transaction";
import { debounce } from "lodash";

interface InventoryTransaction {
  page: "cycleCount" | "sloc" | "stockTransfer";
}

export const useInventoryTransactionHooks = ({
  page,
}: InventoryTransaction) => {
  const {
    cycle,
    sloc,
    stockTransfer,
    cycleCountDetails,
    slocDetails,
    stockTransferDetails,
  } = useAppSelector((state) => state.inventoryTransaction);
  const { status, statusText } = useAppSelector((state) => state.status);
  const { selectedDocument } = useAppSelector((state) => state.document);
  const {
    isScanModal,
    isSelectModal,
    isTargetScanning,
    isSourceScanning,
    isScanBinModal,
  } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // onpaginate
  const checkPageToPaginate = () => {
    console.log("scroll-paginate");
    setPaginating(true);
    switch (page) {
      case "cycleCount":
        const cycleOffset =
          cycle.data.length - 10 <= 0 ? 10 : cycle.data.length - 10;
        dispatch(
          getCycleCount({
            limit: 10,
            offset: cycleOffset,
            paginating: true,
          })
        );
        break;
      case "sloc":
        switch (activeIndex) {
          // valid
          case 0:
          case null:
            const slocValidOffset =
              sloc.validation.data.length - 10 <= 0
                ? 10
                : sloc.validation.data.length - 10;
            dispatch(
              getSLOCValid({
                limit: 10,
                offset: slocValidOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          // posting
          case 1:
            const slocPostOffset =
              sloc.forPosting.data.length - 10 <= 0
                ? 10
                : sloc.forPosting.data.length - 10;
            dispatch(
              getSLOCPosting({
                limit: 10,
                offset: slocPostOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          default:
            break;
        }
        break;
      case "stockTransfer":
        switch (activeIndex) {
          case 0:
          case null:
            const stockTransferValidOffset =
              stockTransfer.validation.data.length - 10 <= 0
                ? 10
                : stockTransfer.validation.data.length - 10;
            dispatch(
              getStockTransferValid({
                limit: 10,
                offset: stockTransferValidOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          case 1:
            const stockTransferPostOffset =
              stockTransfer.forPosting.data.length - 10 <= 0
                ? 10
                : stockTransfer.forPosting.data.length - 10;
            dispatch(
              getStockTransferPosting({
                limit: 10,
                offset: stockTransferPostOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
        }
        break;
    }
  };

  // on refresh
  const checkPageToRefesh = () => {
    setRefreshing(true);
    console.log(activeIndex);
    switch (page) {
      case "cycleCount":
        dispatch(
          getCycleCount({
            limit: 10,
            offset: 0,
          })
        ).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;
      case "sloc":
        switch (activeIndex) {
          case 0:
          case null:
            dispatch(
              getSLOCValid({
                limit: 10,
                offset: 0,
              })
            ).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 1:
            dispatch(
              getSLOCPosting({
                limit: 10,
                offset: 0,
              })
            ).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
        }
        break;
      case "stockTransfer":
        switch (activeIndex) {
          case 0:
          case null:
            dispatch(
              getStockTransferValid({
                limit: 10,
                offset: 0,
              })
            ).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 1:
            dispatch(
              getStockTransferPosting({
                limit: 10,
                offset: 0,
              })
            ).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
        }
        break;
      default:
        break;
    }
  };

  // on tab change
  const checkOnTabChange = () => {
    console.log("tab change");
    switch (page) {
      case "sloc":
        switch (activeIndex) {
          case 0:
            dispatch(
              getSLOCValid({
                limit: 10,
                offset: 0,
              })
            );
            break;
          case 1:
            dispatch(
              getSLOCPosting({
                limit: 10,
                offset: 0,
              })
            );
            break;
        }
        break;
      case "stockTransfer":
        switch (activeIndex) {
          case 0:
            dispatch(
              getStockTransferValid({
                limit: 10,
                offset: 0,
              })
            );
            break;
          case 1:
            dispatch(
              getStockTransferPosting({
                limit: 10,
                offset: 0,
              })
            );
            break;
        }
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      console.log("nagbago");
      checkOnTabChange();
    }
  }, [activeIndex]);

  const debouncedPaginateData = useCallback(
    debounce(checkPageToPaginate, 500),
    []
  );

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const bottomOffset = contentSize.height - layoutMeasurement.height;
    const currentOffset = contentOffset.y;

    const threshold = 50;

    if (currentOffset >= bottomOffset - threshold && !isPaginating) {
      debouncedPaginateData();
    }
  };

  const onRefresh = () => {
    checkPageToRefesh();
  };

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  return {
    cycle,
    sloc,
    stockTransfer,
    onRefresh,
    handleIndexChange,
    handleScroll,
    refreshing,
    isPaginating,
    activeIndex,
    status,
    statusText,
    isScanModal,
    isSelectModal,
    checkPageToPaginate,
    selectedDocument,
    cycleCountDetails,
    slocDetails,
    isSourceScanning,
    isTargetScanning,
    isScanBinModal,
    stockTransferDetails,
  };
};
