import {useAppDispatch, useAppSelector} from "../store/store";
import {useState, useEffect} from "react";
import {ToastMessage} from "../helper/Toast";
import {
  getWTOOutboundPost,
  getWTOOutboundValid,
} from "../store/actions/warehouse/warehouseActions";

interface OutboundUse {
  page: "singlepick" | "wavepick" | "wto";
  tabs: string[];
}

export const useOutboundHooks = ({page}: OutboundUse) => {
  const {singlepick, wavepick, wto} = useAppSelector((state) => state.outbound);
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // onload
  const checkPageToLoad = () => {
    switch (page) {
      case "wto":
        dispatch(getWTOOutboundValid({limit: 10, offset: 0}));
        break;
      case "wavepick":
        // dispatch(getWHS({limit: 10, offset: 0}));
        break;
      case "singlepick":
        // dispatch(getSRTO({limit: 10, offset: 0}));
        break;
      default:
        break;
    }
  };

  // onpaginate
  const checkPageToPaginate = () => {
    setPaginating(true);
    switch (page) {
      case "wto":
        switch (activeIndex) {
          case 0:
            const wtoValidOffset = wto.validation.data.length + 10;
            dispatch(
              getWTOOutboundValid({
                limit: 10,
                offset: wtoValidOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
          case 1:
            const wtoPostOffset = wto.forPosting.data.length + 10;
            dispatch(
              getWTOOutboundPost({limit: 10, offset: wtoPostOffset})
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
        }
        break;
      case "wavepick":
        // dispatch(getWHS({limit: 10, offset: 0}));
        break;
      case "singlepick":
        // dispatch(getSRTO({limit: 10, offset: 0}));
        break;
      default:
        break;
    }
  };

  // on refresh
  const checkPageToRefesh = () => {
    setRefreshing(true);
    switch (page) {
      case "wto":
        switch (activeIndex) {
          case 0:
            dispatch(getWTOOutboundValid({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 1:
            dispatch(getWTOOutboundPost({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;

          default:
            break;
        }
        break;
      case "wavepick":
        // dispatch(getWHS({limit: 10, offset: 0}));
        break;
      case "singlepick":
        // dispatch(getSRTO({limit: 10, offset: 0}));
        break;
      default:
        break;
    }
  };

  // on tab change
  const checkOnTabChange = () => {
    switch (page) {
      case "wto":
        switch (activeIndex) {
          case 0:
            dispatch(getWTOOutboundValid({limit: 10, offset: 0}));
            break;
          case 1:
            dispatch(getWTOOutboundPost({limit: 10, offset: 0}));
            break;
        }

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log("xxx");

    checkPageToLoad();
  }, []);

  useEffect(() => {
    checkOnTabChange();
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    const bottomOffset = contentSize.height - layoutMeasurement.height;
    const currentOffset = contentOffset.y;

    const threshold = 50;

    if (currentOffset >= bottomOffset - threshold && !isPaginating) {
      checkPageToPaginate();
    }
  };

  const onRefresh = () => {
    checkPageToRefesh();
  };

  const handleIndexChange = (index: number) => {
    setActiveIndex(index); // Update the active index
  };

  return {
    isPaginating,
    refreshing,
    onRefresh,
    handleScroll,
    selectedDocument,
    isScanModal,
    isSelectModal,
    wto,
    singlepick,
    wavepick,
    activeIndex,
    handleIndexChange,
  };
};
