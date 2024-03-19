import {useAppDispatch, useAppSelector} from "../store/store";
import {useState, useEffect} from "react";
import {ToastMessage} from "../helper/Toast";
import {
  getWTOOutboundPost,
  getWTOOutboundValid,
  getWPTOValid,
  getWPTOPost,
  getPKValidate,
  getINVPosting,
  getSTGValidate,
  getSPLPosting,
} from "../store/actions/warehouse/warehouseActions";

interface OutboundUse {
  page: "singlepick" | "wavepick" | "wto";
}

export const useOutboundHooks = ({page}: OutboundUse) => {
  const {
    singlepick,
    wavepick,
    wto,
    wtoOutboundDetails,
    wavepickDetails,
    stgDetails,
    singlepickDetails,
  } = useAppSelector((state) => state.outbound);
  const {isScanModal, isSelectModal, isNotificationModal} = useAppSelector(
    (state) => state.modal
  );
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {status, statusText} = useAppSelector((state) => state.status);

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // onload
  const checkPageToLoad = () => {
    switch (page) {
      case "wto":
        dispatch(getWTOOutboundValid({limit: 10, offset: 0}));
        break;
      case "wavepick":
        dispatch(getWPTOValid({limit: 10, offset: 0}));
        break;
      case "singlepick":
        dispatch(getPKValidate({limit: 10, offset: 0}));
      // break;
    }
  };

  // onpaginate
  const checkPageToPaginate = () => {
    console.log("scroll-paginate");
    setPaginating(true);
    switch (page) {
      case "wto":
        switch (activeIndex) {
          // valid
          case 0:
          case null:
            const wtoValidOffset =
              wto.validation.data.length - 10 === 0
                ? 10
                : wto.validation.data.length - 10;
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
            break;
          case 1:
            // posting
            const wtoPostOffset =
              wto.forPosting.data.length - 10 === 0
                ? 10
                : wto.forPosting.data.length - 10;
            // wto.forPosting.data.length + 10;
            dispatch(
              getWTOOutboundPost({
                limit: 10,
                offset: wtoPostOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
        }
        break;
      case "wavepick":
        switch (activeIndex) {
          // valid
          case 0:
          case null:
            const wptoValidOffset =
              wavepick.validation.data.length - 10 === 0
                ? 10
                : wavepick.validation.data.length - 10;
            // wavepick.validation.data.length + 10;
            dispatch(
              getWPTOValid({
                limit: 10,
                offset: wptoValidOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });

            break;
          // posting
          case 1:
            const wptoPostOffset =
              wavepick.forPosting.data.length - 10 === 0
                ? 10
                : wavepick.forPosting.data.length - 10;
            dispatch(
              getWPTOPost({
                limit: 10,
                offset: wptoPostOffset,
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
      case "singlepick":
        switch (activeIndex) {
          case 0:
          case null:
            const pkOffset =
              singlepick.pkValidate.data.length - 10 === 0
                ? 10
                : singlepick.pkValidate.data.length - 10;
            dispatch(
              getPKValidate({
                limit: 10,
                offset: pkOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          case 1:
            const invOffset =
              singlepick.invPosting.data.length - 10 === 0
                ? 10
                : singlepick.invPosting.data.length - 10;
            dispatch(
              getINVPosting({
                limit: 10,
                offset: invOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          case 2:
            const stgOffset =
              singlepick.stgValidate.data.length - 10 === 0
                ? 10
                : singlepick.stgValidate.data.length - 10;
            // singlepick.stgValidate.data.length + 10;
            dispatch(
              getSTGValidate({
                limit: 10,
                offset: stgOffset,
                paginating: true,
              })
            ).then(() => {
              ToastMessage("Table updated.", 1000);
              setPaginating(false);
            });
            break;
          case 3:
            const splOffset =
              singlepick.splPosting.data.length - 10 === 0
                ? 10
                : singlepick.splPosting.data.length - 10;

            // singlepick.splPosting.data.length + 10;
            dispatch(
              getSTGValidate({
                limit: 10,
                offset: splOffset,
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
      case "wto":
        switch (activeIndex) {
          case 0:
          case null:
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
        }
        break;
      case "wavepick":
        switch (activeIndex) {
          case 0:
          case null:
            dispatch(getWPTOValid({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 1:
            dispatch(getWPTOPost({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
        }
        break;
      case "singlepick":
        switch (activeIndex) {
          case 0:
          case null:
            dispatch(getPKValidate({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 1:
            dispatch(getINVPosting({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 2:
            dispatch(getSTGValidate({limit: 10, offset: 0})).then(() => {
              setRefreshing(false);
              ToastMessage("Refresh Success", 1000);
            });
            break;
          case 3:
            dispatch(getSPLPosting({limit: 10, offset: 0})).then(() => {
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
      case "wavepick":
        switch (activeIndex) {
          case 0:
            dispatch(getWPTOValid({limit: 10, offset: 0}));
            break;
          case 1:
            dispatch(getWPTOPost({limit: 10, offset: 0}));
            break;
        }
        break;
      case "singlepick":
        switch (activeIndex) {
          case 0:
            dispatch(getPKValidate({limit: 10, offset: 0}));
            break;
          case 1:
            dispatch(getINVPosting({limit: 10, offset: 0}));
            break;
          case 2:
            dispatch(getSTGValidate({limit: 10, offset: 0}));
            break;
          case 3:
            dispatch(getSPLPosting({limit: 10, offset: 0}));
            break;
        }
    }
  };

  // deprecated refer to usehomeroutes
  // useEffect(() => {
  // checkPageToLoad();
  // }, []);

  useEffect(() => {
    if (activeIndex !== null) {
      checkOnTabChange();
    }
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
    setActiveIndex(index);
  };

  return {
    isPaginating,
    refreshing,
    onRefresh,
    handleScroll,
    selectedDocument,
    isScanModal,
    isSelectModal,
    isNotificationModal,
    wto,
    wtoOutboundDetails,
    status,
    statusText,
    singlepick,
    wavepick,
    activeIndex,
    handleIndexChange,
    wavepickDetails,
    singlepickDetails,
  };
};
