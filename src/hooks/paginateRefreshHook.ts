import {useState} from "react";
import {useAppSelector, useAppDispatch} from "../store/store";
import {getBatch} from "../store/actions/generalActions";
import {ToastMessage} from "../helper/Toast";

// type uses = "batchSearch";
interface PaginateProps {
  uses: "batchSearch";
}

export const usePaginateRefreshHooks = ({uses}: PaginateProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);
  const {selectedBatchItem, selectedBinDetails} = useAppSelector(
    (state) => state.document
  );
  const {batch} = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const checkPageToPaginate = () => {
    setPaginating(true);
    switch (uses) {
      case "batchSearch":
        const batchOffset =
          batch.data.length - 10 === 0 ? 10 : batch.data.length - 10;
        dispatch(
          getBatch({
            limit: 10,
            offset: batchOffset,
            itmcde: selectedBinDetails.itmcde || selectedBatchItem.itmcde,
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
  };

  const checkPageToRefesh = () => {
    switch (uses) {
      case "batchSearch":
        dispatch(
          getBatch({
            limit: 10,
            offset: 0,
            itmcde: selectedBinDetails.itmcde || selectedBatchItem.itmcde,
          })
        ).then(() => {
          setRefreshing(false);
          ToastMessage("Refresh Success", 1000);
        });
        break;

      default:
        break;
    }
  };

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

  return {
    handleScroll,
    onRefresh,
    refreshing,
    isPaginating,
  };
};
