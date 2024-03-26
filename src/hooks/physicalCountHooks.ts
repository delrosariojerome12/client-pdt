import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useEffect, useCallback } from "react";
import { ToastMessage } from "../helper/Toast";
import { getphysicalRecord } from "../store/actions/ims/physicalCount";
import { debounce } from "lodash";

interface Replenishment {
  page: "physical-inventory-record";
}

export const usePhysicalCountHooks = ({ page }: Replenishment) => {
  const { tableData, tableDetails, tableDetailsTotal } = useAppSelector(
    (state) => state.table
  );
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
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(tableData.data);

  const handleSearch = () => {
    if (!searchText) {
      return tableData;
    }

    const searchFields = [
      "trndte",
      "refnum",
      "warcde",
      "warcdenum",
      "warloccde",
    ];

    const newTableData = tableData.data.filter((item) =>
      searchFields.some(
        (field) => item[field] && item[field].toString().includes(searchText)
      )
    );

    setFilteredData(newTableData);
  };

  const handleChangeSearchText = (e: any) => {
    if (searchText === "") {
      setFilteredData(tableData.data);
      setSearchText(e);
    } else {
      setSearchText(e);
    }
  };
  // onpaginate
  const checkPageToPaginate = () => {
    console.log("scroll-paginate");
    setPaginating(true);
    switch (page) {
      case "physical-inventory-record":
        const pirOffset =
          tableData.data.length - 10 <= 0 ? 10 : tableData.data.length - 10;
        dispatch(
          getphysicalRecord({
            limit: 10,
            offset: pirOffset,
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

  // on refresh
  const checkPageToRefesh = () => {
    setRefreshing(true);
    console.log(activeIndex);
    switch (page) {
      case "physical-inventory-record":
        dispatch(
          getphysicalRecord({
            limit: 10,
            offset: 0,
          })
        ).then(() => {
          ToastMessage("Refresh Success", 1000);
          setRefreshing(false);
        });
        break;
      default:
        break;
    }
  };

  // on tab change
  const checkOnTabChange = () => {
    console.log("tab change");
    switch (page) {
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
    tableDetailsTotal,
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
    filteredData,
    searchText,
    handleSearch,
    handleChangeSearchText,
  };
};
