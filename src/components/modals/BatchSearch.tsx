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
import CustomTable from "../forms/table/CustomTable";
import {useAppSelector} from "../../store/store";

interface BatchSearchProps {
  visible: boolean;
  onClose: () => void;
  onSaveBatch: (batchnum: string) => void;
}
const tableHeaders = ["Batch No.", "Mfg. Date", "Exp. Date", ""];
const tableVisibleProps = ["batchnum", "mfgdte", "expdte"];

const BatchSearch = React.memo((props: BatchSearchProps) => {
  const {batch} = useAppSelector((state) => state.general);
  const {onClose, onSaveBatch, visible} = props;
  const [searchBatchNo, setSearchBatchNo] = useState("");

  const handleOnChange = (key: string, value: string | number) => {
    setSearchBatchNo(String(value));
  };
  const handleSetBatchNum = (selectedItem: any) => {
    onSaveBatch(selectedItem);
  };

  console.log("batch search");

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection: "row", gap: 10}}>
            <Text style={styles.headerText}>Batch Details</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <CustomInputs
            onInputChange={handleOnChange}
            inputValue={searchBatchNo}
            type="text"
            placeHolder={"Search"}
            inputKey="scan"
            useFlex={true}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#ccc",
              padding: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              alert("no api yet");
            }}
          >
            <FontAwesome name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalView}>
            <CustomTable
              tableHeaders={tableHeaders}
              tableData={batch.data || []}
              visibleProperties={tableVisibleProps}
              isPostDisable={true}
              isSelectDisable={true}
              onBatchSelect={handleSetBatchNum}
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
  searchContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default BatchSearch;
