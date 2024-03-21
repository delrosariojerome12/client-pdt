import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

interface SearchModalProps {
  visible: boolean;
}

const SearchModal = (props: SearchModalProps) => {
  const { searchModalContent } = useAppSelector((state) => state.modal);
  const { data: warehouseData } = useAppSelector(
    (state) => state.search.warehouse
  );
  const { data: itemData } = useAppSelector((state) => state.search.item);
  const { data: binData } = useAppSelector((state) => state.search.binnum);
  const dispatch = useAppDispatch();
  const { visible } = props;
  const [searchText, setSearchText] = useState("");

  const handleOnChange = (key: string, value: string | number) => {
    setSearchText(String(value));
  };

  const handleSearchModal = async () => {
    console.log("pumasok?", searchModalContent);
    switch (searchModalContent) {
      case "warehouse":
        warehouseData.filter(
          (e) =>
            e.warcde?.indexOf(searchText) ||
            e.warcdenum?.indexOf(searchText) ||
            e.warloccde?.indexOf(searchText)
        );
        break;

      default:
        break;
    }
  };

  const handleCloseModal = () => {
    dispatch(handleToggleSearchModal());
  };

  const renderTable = () => {
    switch (searchModalContent) {
      case "warehouse":
        if (warehouseData) {
          return (
            <CustomTable
              tableHeaders={["Warehouse", "Whs No.", "S.Loc.", "Action"]}
              tableData={warehouseData}
              visibleProperties={["warcde", "warcdenum", "warloccde"]}
              isSelectDisable={true}
              isPostDisable={true}
              buttonUses=""
              onSelectRow={(item) => {
                dispatch(handleSetWarehouse(item));
                handleCloseModal();
              }}
            />
          );
        }
      case "bin":
        if (binData) {
          return (
            <CustomTable
              tableHeaders={["Bin No.", "Action"]}
              tableData={binData}
              visibleProperties={["binnum"]}
              isSelectDisable={true}
              isPostDisable={true}
              buttonUses=""
              onSelectRow={(item) => {
                dispatch(handleSetBinText(item.binnum));
                handleCloseModal();
              }}
            />
          );
        }
      case "item":
        if (itemData) {
          return (
            <CustomTable
              tableHeaders={["Item Code", "Item Description", "Action"]}
              tableData={itemData}
              visibleProperties={["itmcde", "itmdsc"]}
              isSelectDisable={true}
              isPostDisable={true}
              buttonUses=""
              onSelectRow={(item) => {
                dispatch(handleSetItemText(item.itmcde));
                handleCloseModal();
              }}
            />
          );
        }
      default:
        break;
    }
  };

  console.log("search");

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
          <View style={styles.searchContainer}>
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
              onPress={() => handleSearchModal}
            >
              <FontAwesome name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {renderTable()}
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
});

export default SearchModal;
