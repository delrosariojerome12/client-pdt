import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useEffect, useCallback } from "react";
import { ToastMessage } from "../helper/Toast";
import {
  getStockTOPosting,
  getStockTOValid,
} from "../store/actions/ims/replenishment";
import { debounce } from "lodash";

interface Replenishment {
  page: "stockReplenishment";
}

export const useReplenishmentHooks = ({ page }: Replenishment) => {
  const { tableData, tableDetails } = useAppSelector((state) => state.table);
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
      case "stockReplenishment":
        switch (activeIndex) {
          case 0:
          case null:
            const stockValidOffset =
              tableData.data.length - 10 <= 0 ? 10 : tableData.data.length - 10;
            dispatch(
              getStockTOValid({
                limit: 10,
                offset: stockValidOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          case 1:
            const stockPostOffset =
              tableData.data.length - 10 <= 0 ? 10 : tableData.data.length - 10;
            dispatch(
              getStockTOPosting({
                limit: 10,
                offset: stockPostOffset,
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
      default:
        break;
    }
  };

  // on refresh
  const checkPageToRefesh = () => {
    setRefreshing(true);
    console.log(activeIndex);
    switch (page) {
      case "stockReplenishment":
        switch (activeIndex) {
          case 0:
          case null:
            dispatch(
              getStockTOValid({
                limit: 10,
                offset: 0,
              })
            ).then(() => {
              ToastMessage("Refresh Success", 1000);
              setRefreshing(false);
            });
            break;
          case 1:
            dispatch(
              getStockTOPosting({
                limit: 10,
                offset: 0,
              })
            ).then(() => {
              ToastMessage("Refresh Success", 1000);
              setRefreshing(false);
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
      case "stockReplenishment":
        switch (activeIndex) {
          case 0:
            dispatch(
              getStockTOValid({
                limit: 10,
                offset: 0,
              })
            );
            break;
          case 1:
            dispatch(
              getStockTOPosting({
                limit: 10,
                offset: 0,
              })
            );
            break;
        }
        break;
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
    tableData,
    tableDetails,
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
    isSourceScanning,
    isTargetScanning,
    isScanBinModal,
  };
};
