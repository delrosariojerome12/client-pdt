import { useAppDispatch, useAppSelector } from "../store/store";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { getWarehouse } from "../store/actions/generalActions";
import { ToastMessage } from "../helper/Toast";

export const useSearchHooks = () => {
  const { searchModalContent } = useAppSelector((state) => state.modal);
  const { warehouse, binnum, item } = useAppSelector((state) => state.search);
  const { status, statusText } = useAppSelector((state) => state.status);

  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>();

  const handleSearch = () => {
    if (!searchText) {
      switch (searchModalContent) {
        case "warehouse":
          return warehouse;
        case "bin":
          return binnum;
        case "item":
          return item;
        default:
          break;
      }
      return null;
    }

    let newTableData: any;
    let searchFields: string[];
    console.log("searchModalContent", searchModalContent);
    switch (searchModalContent) {
      case "warehouse":
        searchFields = ["warcde", "warcdenum", "warloccde"];
        newTableData = warehouse?.data.filter((warehouse: any) =>
          searchFields.some(
            (field) =>
              warehouse[field] &&
              warehouse[field].toString().includes(searchText)
          )
        );
        break;
      case "bin":
        searchFields = ["binnum"];
        newTableData = binnum?.data.filter((binnum: any) =>
          searchFields.some(
            (field) =>
              binnum[field] && binnum[field].toString().includes(searchText)
          )
        );
        break;
      case "item":
        searchFields = ["itmcde", "itmdsc"];
        newTableData = item?.data.filter((item: any) =>
          searchFields.some(
            (field) =>
              item[field] && item[field].toString().includes(searchText)
          )
        );
        break;
      default:
        break;
    }
    console.log("searchText", searchText);
    console.log("newTableData", newTableData);

    setFilteredData(newTableData);
  };

  const handleChangeSearchText = (e: any) => {
    if (searchText === "") {
      switch (searchModalContent) {
        case "warehouse":
          setFilteredData(warehouse.data);
          break;
        case "bin":
          setFilteredData(binnum.data);
          break;
        case "item":
          setFilteredData(item.data);
          break;
      }
      setSearchText(e);
    } else {
      setSearchText(e);
    }
  };

  // onpaginate
  const checkPageToPaginate = () => {
    console.log("scroll-paginate");
    setPaginating(true);
    switch (searchModalContent) {
      case "warehouse":
        const warehouseOffset =
          warehouse.data.length - 10 <= 0 ? 10 : warehouse.data.length - 10;
        dispatch(
          getWarehouse({
            limit: 10,
            offset: warehouseOffset,
            paginating: true,
          })
        ).then(() => {
          ToastMessage("Table updated.", 1000);
          setPaginating(false);
        });
        break;
    }
  };

  // on refresh
  const checkPageToRefesh = () => {
    setRefreshing(true);
    switch (searchModalContent) {
      case "warehouse":
        dispatch(
          getWarehouse({
            limit: 10,
            offset: 0,
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
    searchModalContent,
    warehouse,
    binnum,
    item,
    onRefresh,
    handleScroll,
    refreshing,
    isPaginating,
    status,
    statusText,
    checkPageToPaginate,
    filteredData,
    searchText,
    handleSearch,
    handleChangeSearchText,
  };
};
