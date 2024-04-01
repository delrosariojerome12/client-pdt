import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import CustomInputs from "../forms/inputs/CustomInputs";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { handleToggleSearchModal } from "../../reducers/modalReducer";
import {
  handleSetWarehouse,
  handleSetBinText,
  handleSetItemText,
} from "../../reducers/searchReducer";
import CustomTable from "../forms/table/CustomTable";
import { useSearchHooks } from "../../hooks/searchHooks";
import InputWithSearch from "../forms/inputs/InputWithSearch";

interface SearchModalProps {
  visible: boolean;
}

const SearchModal = (props: SearchModalProps) => {
  const {
    searchModalContent,
    isPaginating,
    refreshing,
    onRefresh,
    handleScroll,
    warehouse,
    binnum,
    item,
    filteredData,
    searchText,
    handleSearch,
    handleChangeSearchText,
  } = useSearchHooks();
  const dispatch = useAppDispatch();
  const { visible } = props;

  const handleCloseModal = () => {
    dispatch(handleToggleSearchModal());
  };

  const renderTable = () => {
    switch (searchModalContent) {
      case "warehouse":
        if (warehouse?.data) {
          return (
            <CustomTable
              tableHeaders={["Warehouse", "Whs No.", "S.Loc.", "Action"]}
              tableData={searchText ? filteredData : warehouse?.data}
              visibleProperties={["warcde", "warcdenum", "warloccde"]}
              isSelectDisable={true}
              isPostDisable={true}
              buttonUses=""
              onSelectRow={(item) => {
                dispatch(handleSetWarehouse(item));
                handleCloseModal();
              }}
              loadingStatus={
                warehouse?.status === "loading" &&
                !refreshing &&
                !isPaginating &&
                true
              }
            />
          );
        }
      case "bin":
        if (binnum?.data) {
          return (
            <CustomTable
              tableHeaders={["Bin No.", "Action"]}
              tableData={searchText ? filteredData : binnum?.data}
              visibleProperties={["binnum"]}
              isSelectDisable={true}
              isPostDisable={true}
              buttonUses=""
              onSelectRow={(item) => {
                dispatch(handleSetBinText(item.binnum));
                handleCloseModal();
              }}
              loadingStatus={
                binnum?.status === "loading" &&
                !refreshing &&
                !isPaginating &&
                true
              }
            />
          );
        }
      case "item":
        if (item?.data) {
          return (
            <CustomTable
              tableHeaders={["Item Code", "Item Description", "Action"]}
              tableData={searchText ? filteredData : item?.data}
              visibleProperties={["itmcde", "itmdsc"]}
              isSelectDisable={true}
              isPostDisable={true}
              buttonUses=""
              onSelectRow={(item) => {
                dispatch(handleSetItemText(item.itmcde));
                handleCloseModal();
              }}
              loadingStatus={
                item?.status === "loading" &&
                !refreshing &&
                !isPaginating &&
                true
              }
            />
          );
        }
      default:
        break;
    }
  };

  console.log(`${searchModalContent} search`);

  return (
    <Modal visible={visible} onRequestClose={handleCloseModal} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome5 name="arrow-left" size={24} colr="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {searchModalContent &&
                `Search: ${searchModalContent.toUpperCase()}`}
            </Text>
          </View>
          <InputWithSearch
            label="Search"
            onShow={handleSearch}
            text={searchText}
            onTextChange={handleChangeSearchText}
          />
          {/* <View style={styles.searchContainer}>
            <CustomInputs
              placeHolder="Search"
              inputKey="search"
              inputValue={searchText}
              onInputChange={handleOnChange}
              type="text"
              useFlex={true}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#ccc",
                padding: 20,
                borderRadius: 10,
              }}
              onPress={() => console.log("asdas")}
            >
              <FontAwesome name="search" size={20} color="black" />
            </TouchableOpacity>
          </View> */}
          <ScrollView
            style={styles.innerContainer}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScroll={handleScroll}
            scrollEventThrottle={0}
          >
            {renderTable()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    width: "100%",
    gap: 15,
  },
  topContainer: {
    gap: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
  },
  searchContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  continueBtn: {
    width: "60%",
  },
  closeBtn: {
    width: "40%",
  },
  headerContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  customContainer: {
    width: "100%",
  },
  properties: {
    flexDirection: "row",
    gap: 10,
  },
  label: {
    fontWeight: "bold",
  },
  innerContainer: {
    flex: 1,
    gap: 15,
  },
});

export default SearchModal;
