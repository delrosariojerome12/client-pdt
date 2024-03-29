import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useEffect, useCallback } from "react";
import { ToastMessage } from "../helper/Toast";
import {
  getPTO,
  getPUR,
  getWTO,
  getWHS,
  getSRTO,
} from "../store/actions/warehouse/warehouseActions";
import { debounce } from "lodash";

interface InboundUse {
  page: "pto" | "pur" | "srto" | "whs" | "wto";
}

export const useInboundHooks = ({ page }: InboundUse) => {
  const { pto, pur, wto, srto, whs, ptoDetails, srtoDetails, wtoDetails } =
    useAppSelector((state) => state.inbound);
  const { status, statusText } = useAppSelector((state) => state.status);

  const { isScanModal, isSelectModal, isScanItemModal, isNotificationModal } =
    useAppSelector((state) => state.modal);
  const { selectedDocument } = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);

  // onload
  const checkPageToLoad = () => {
    switch (page) {
      case "pto":
        dispatch(getPTO({ limit: 10, offset: 0 }));
        break;
      case "pur":
        dispatch(getPUR({ limit: 10, offset: 0 }));
        break;
      case "wto":
        dispatch(getWTO({ limit: 10, offset: 0 }));
        break;
      case "whs":
        dispatch(getWHS({ limit: 10, offset: 0 }));
        break;
      case "srto":
        dispatch(getSRTO({ limit: 10, offset: 0 }));
        break;
      default:
        break;
    }
  };

  // onpaginate
  const checkPageToPaginate = () => {
    setPaginating(true);
    switch (page) {
      case "pto":
        const ptoOffset = pto.data.length - 10 <= 0 ? 10 : pto.data.length - 10;
        dispatch(
          getPTO({ limit: 10, offset: ptoOffset, paginating: true })
        ).then(() => {
          ToastMessage("Table updated.", 1000);
          setPaginating(false);
        });
        break;
      case "pur":
        const purOffset = pur.data.length - 10 <= 0 ? 10 : pur.data.length - 10;
        dispatch(
          getPUR({ limit: 10, offset: purOffset, paginating: true })
        ).then(() => {
          ToastMessage("Table updated.", 1000);
          setPaginating(false);
        });
        break;
      case "wto":
        const wtoOffset = wto.data.length - 10 <= 0 ? 10 : wto.data.length - 10;
        dispatch(
          getWTO({ limit: 10, offset: wtoOffset, paginating: true })
        ).then(() => {
          ToastMessage("Table updated.", 1000);
          setPaginating(false);
        });
        break;
      case "whs":
        const whsOffset = whs.data.length - 10 <= 0 ? 10 : whs.data.length - 10;
        dispatch(
          getWHS({ limit: 10, offset: whsOffset, paginating: true })
        ).then(() => {
          ToastMessage("Table updated.", 1000);
          setPaginating(false);
        });
        break;
      case "srto":
        const srtoOffset =
          srto.data.length - 10 <= 0 ? 10 : srto.data.length - 10;
        dispatch(
          getSRTO({ limit: 10, offset: srtoOffset, paginating: true })
        ).then(() => {
          ToastMessage("Table updated.", 1000);
          setPaginating(false);
        });
        break;

      default:
        break;
    }
  };

  // on refresh
  const checkPageToRefesh = () => {
    setRefreshing(true);

    switch (page) {
      case "pto":
        dispatch(getPTO({ limit: 10, offset: 0 })).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;
      case "pur":
        dispatch(getPUR({ limit: 10, offset: 0 })).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;
      case "wto":
        dispatch(getWTO({ limit: 10, offset: 0 })).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;
      case "whs":
        dispatch(getWHS({ limit: 10, offset: 0 })).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;
      case "srto":
        dispatch(getSRTO({ limit: 10, offset: 0 })).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;
      default:
        break;
    }
  };

  // put the call on press refer to useHomeRoutes
  // useEffect(() => {
  // checkPageToLoad();
  // }, []);

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

  return {
    isPaginating,
    refreshing,
    onRefresh,
    handleScroll,
    pto,
    pur,
    wto,
    srto,
    whs,
    ptoDetails,
    wtoDetails,
    srtoDetails,
    selectedDocument,
    isScanModal,
    isSelectModal,
    isScanItemModal,
    status,
    statusText,
    isNotificationModal,
  };
};
