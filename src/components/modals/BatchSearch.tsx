import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";
import CustomInputs from "../forms/inputs/CustomInputs";
import {format} from "../../styles/styles";
import {shadows} from "../../styles/styles";
import CustomTable from "../forms/table/CustomTable";

interface BatchSearchProps {
  visible: boolean;
  onClose: () => void;
  onSaveBatch: (batchnum: string) => void;
}

const BatchSearch = React.memo((props: BatchSearchProps) => {
  const {onClose, onSaveBatch, visible} = props;
  const [searchBatchNo, setSearchBatchNo] = useState("");

  const handleOnChange = (key: string, value: string | number) => {
    setSearchBatchNo(String(value));
  };
  const handleSetBatchNum = (selectedItem: any) => {
    setSearchBatchNo(selectedItem.batchNumber);
    onSaveBatch(selectedItem.batchNumber);
  };

  console.log("batch search");
  const tableHeaders = ["Batch No.", "Mfg. Date", "Exp. Date", ""];
  const tableVisibleProps = ["batchNumber", "mfgDate", "expDate"];

  const data = [
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
  ];
  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <CustomInputs
                onInputChange={handleOnChange}
                inputValue={searchBatchNo}
                type="text"
                placeHolder={"Batch No."}
                inputKey="scan"
                useFlex={true}
              />
            </View>

            <CustomTable
              tableHeaders={tableHeaders}
              tableData={data}
              visibleProperties={tableVisibleProps}
              isPostDisable={true}
              onSelect={handleSetBatchNum}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    gap: 20,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default BatchSearch;
