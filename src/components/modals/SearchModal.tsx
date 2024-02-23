import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import CustomInputs from "../forms/inputs/CustomInputs";
import {useAppSelector, useAppDispatch} from "../../store/store";
import {handleToggleSearchModal} from "../../reducers/modalReducer";
import ReactPaperTable from "../forms/table/ReactPaperTable";
import {
  handleSetWarehouse,
  handleSetBinText,
  handleSetItemText,
} from "../../reducers/searchReducer";
interface SearchModalProps {
  visible: boolean;
}

const data = [
  {
    warehouse: "Warehouse A",
    whsNo: "WH001",
    date: "2024-02-17",
    ccrNo: "CCR001",
    sLoc: "good",
    pirNo: "123ANC",
    items: [
      {
        itemCode: "ABC123",
        itemName: "Item 1",
        pieces: 5,
        receiveQty: 5,
        LPNNumber: "LPN123",
        batchNumber: "BATCH001",
        mfgDate: "2023-01-01",
        expDate: "2024-12-31",
      },
      {
        itemCode: "DEF456",
        itemName: "Item 2",
        pieces: 10,
        receiveQty: 10,
        LPNNumber: "LPN456",
        batchNumber: "BATCH002",
        mfgDate: "2023-02-01",
        expDate: "2024-12-31",
      },
      {
        itemCode: "GHI789",
        itemName: "Item 3",
        pieces: 15,
        receiveQty: 15,
        LPNNumber: "LPN789",
        batchNumber: "BATCH003",
        mfgDate: "2023-03-01",
        expDate: "2024-12-31",
      },
    ],
  },
  {
    warehouse: "Warehouse B",
    whsNo: "WH002",
    date: "2024-02-17",
    ccrNo: "CCR002",
    sLoc: "bad",
    pirNo: "123ANC",

    items: [
      {
        itemCode: "ABC123",
        itemName: "Item 1",
        pieces: 5,
        receiveQty: 5,
        LPNNumber: "LPN123",
        batchNumber: "BATCH001",
        mfgDate: "2023-01-01",
        expDate: "2024-12-31",
      },
    ],
  },
  {
    warehouse: "Warehouse C",
    whsNo: "WH003",
    date: "2024-02-17",
    ccrNo: "CCR003",
    sLoc: "good",
  },
  {
    warehouse: "Warehouse D",
    whsNo: "WH003",
    date: "2024-02-17",
    ccrNo: "CCR003",
    sLoc: "good",
    pirNo: "123ANC",
    items: [
      {
        itemCode: "ABC123",
        itemName: "Item 1",
        pieces: 5,
        receiveQty: 5,
        LPNNumber: "LPN123",
        batchNumber: "BATCH001",
        mfgDate: "2023-01-01",
        expDate: "2024-12-31",
      },
      {
        itemCode: "DEF456",
        itemName: "Item 2",
        pieces: 10,
        receiveQty: 10,
        LPNNumber: "LPN456",
        batchNumber: "BATCH002",
        mfgDate: "2023-02-01",
        expDate: "2024-12-31",
      },
    ],
  },
];

const items = [
  {
    itemCode: "ABC123",
    itemName: "Item 1",
    pieces: 5,
    receiveQty: 5,
    LPNNumber: "LPN123",
    batchNumber: "BATCH001",
    mfgDate: "2023-01-01",
    expDate: "2024-12-31",
  },
  {
    itemCode: "DEF456",
    itemName: "Item 2",
    pieces: 10,
    receiveQty: 10,
    LPNNumber: "LPN456",
    batchNumber: "BATCH002",
    mfgDate: "2023-02-01",
    expDate: "2024-12-31",
  },
];

const SearchModal = (props: SearchModalProps) => {
  const {searchModalContent} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const {visible} = props;
  const [searchText, setSearchText] = useState("");

  const handleOnChange = (key: string, value: string | number) => {
    setSearchText(String(value));
  };

  const handleCloseModal = () => {
    dispatch(handleToggleSearchModal());
  };

  const renderTable = () => {
    switch (searchModalContent) {
      case "warehouse":
        return (
          <ReactPaperTable
            tableHeaders={["Warehouse", "Whs No.", "S.Loc."]}
            tableData={data}
            visibleProperties={["warehouse", "whsNo", "sLoc"]}
            disableActions={true}
            onSelectRow={(item) => {
              dispatch(handleSetWarehouse(item));
              handleCloseModal();
            }}
          />
        );
      case "bin":
        return (
          <ReactPaperTable
            tableHeaders={["Bin No."]}
            tableData={data}
            visibleProperties={["ccrNo"]}
            disableActions={true}
            onSelectRow={(item) => {
              // change the extension name
              dispatch(handleSetBinText(item.ccrNo));
              handleCloseModal();
            }}
          />
        );
      case "item":
        return (
          <ReactPaperTable
            tableHeaders={["Description", "Mfg. Date", "Exp. Date"]}
            tableData={items}
            visibleProperties={["itemName", "mfgDate", "expDate"]}
            disableActions={true}
            onSelectRow={(item) => {
              // change the extension name
              dispatch(handleSetItemText(item.itemName));
              handleCloseModal();
            }}
          />
        );

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
              <FontAwesome5 name="arrow-left" size={24} colr="lback" />
            </TouchableOpacity>
            <CustomInputs
              placeHolder="Search"
              inputKey="search"
              inputValue={searchText}
              onInputChange={handleOnChange}
              type="text"
              useFlex={true}
            />
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
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
  },
});

export default SearchModal;
