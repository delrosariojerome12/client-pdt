import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useEffect, useCallback } from "react";
import { ToastMessage } from "../helper/Toast";
import { debounce } from "lodash";
import { getDTSPosting, getDTSValid } from "../store/actions/ims/subcon";

interface SubCon {
  page: "deliveryToSupplier";
}

export const useSubConHooks = ({ page }: SubCon) => {
  const { deliveryToSupplier, deliveryToSupplierDetails } = useAppSelector(
    (state) => state.subcon
  );
  const { status, statusText } = useAppSelector((state) => state.status);
  const { selectedDocument } = useAppSelector((state) => state.document);
  const {
    isScanModal,
    isSelectModal,
    isTargetScanning,
    isSourceScanning,
    isScanBinModal,
    isOutboundItemScan,
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
      case "deliveryToSupplier":
        switch (activeIndex) {
          case 0:
          case null:
            const deliveryToSupplierValidOffset =
              deliveryToSupplier.validation.data.length - 10 <= 0
                ? 10
                : deliveryToSupplier.validation.data.length - 10;
            dispatch(
              getDTSValid({
                limit: 10,
                offset: deliveryToSupplierValidOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          case 1:
            const deliveryToSupplierPostOffset =
              deliveryToSupplier.forPosting.data.length - 10 <= 0
                ? 10
                : deliveryToSupplier.forPosting.data.length - 10;
            dispatch(
              getDTSPosting({
                limit: 10,
                offset: deliveryToSupplierPostOffset,
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
      case "deliveryToSupplier":
        switch (activeIndex) {
          case 0:
          case null:
            dispatch(
              getDTSValid({
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
              getDTSPosting({
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
    switch (page) {
      case "deliveryToSupplier":
        switch (activeIndex) {
          case 0:
            dispatch(
              getDTSValid({
                limit: 10,
                offset: 0,
              })
            );
            break;
          case 1:
            dispatch(
              getDTSPosting({
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
    deliveryToSupplier,
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
    isOutboundItemScan,
    deliveryToSupplierDetails,
  };
};
