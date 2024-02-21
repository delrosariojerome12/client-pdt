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
import BatchSearch from "./BatchSearch";
import CustomButton from "../forms/buttons/CustomButton";
import {shadows} from "../../styles/styles";

interface BatchDetailsProps {
  visible: boolean;
  onClose: () => void;
  onSave: (batchnum: string, item: any) => void;
  item: any;
}

const BatchDetails = (props: BatchDetailsProps) => {
  const {item, onClose, onSave, visible} = props;
  const [batchNo, setBatchNo] = useState(item.batchNumber); //change this to batch number name
  const [isBatchSearch, setIsBatchSearch] = useState(item.batchNumber); //change this to batch number name

  const handleOnChange = (key: string, value: string | number) => {
    setBatchNo(String(value));
  };

  const handleToggleBatch = () => {
    setIsBatchSearch(!isBatchSearch);
  };

  const clearValues = () => {
    setBatchNo("");
    setIsBatchSearch(false);
  };

  const handleSetSearchBatch = (batchnum: string) => {
    setBatchNo(batchnum);
  };

  console.log("batch details");

  return (
    <>
      <Modal visible={visible} onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onClose}>
                  <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Batch Details</Text>
              </View>

              <View style={format.twoItemsRow}>
                <CustomInputs
                  onInputChange={handleOnChange}
                  inputValue={batchNo}
                  type="text"
                  placeHolder={"Batch No."}
                  inputKey="scan"
                  useFlex={true}
                />
                <TouchableOpacity onPress={handleToggleBatch}>
                  <FontAwesome name="search" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View style={[styles.datesContainer, shadows.boxShadow]}>
                <View style={format.twoRowTextBetween}>
                  <Text style={styles.datesTextLabel}>Mfg. Date:</Text>
                  <Text style={styles.datesText}>{item.expDate}</Text>
                </View>
                <View style={format.twoRowTextBetween}>
                  <Text style={styles.datesTextLabel}>Exp. Date:</Text>
                  <Text style={styles.datesText}>{item.mfgDate}</Text>
                </View>

                <View style={styles.buttonContainer}>
                  <CustomButton
                    onPress={() => {
                      onSave(batchNo, item);
                      clearValues();
                    }}
                    title="Save"
                    type="save"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                  <CustomButton
                    onPress={() => {
                      onClose();
                    }}
                    title="Close"
                    type="delete"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {isBatchSearch && (
        <BatchSearch
          visible={isBatchSearch}
          onClose={handleToggleBatch}
          onSaveBatch={handleSetSearchBatch}
        />
      )}
    </>
  );
};

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
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    padding: 15,
  },
  itemContainer: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 50 / 10,
    gap: 10,
  },
  continueBtn: {
    width: "60%",
  },
  closeBtn: {
    width: "40%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  floatingText: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#fff",
  },
  datesText: {
    fontSize: 16,
  },
  datesTextLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  datesContainer: {
    gap: 10,
    padding: 10,
  },
});

export default BatchDetails;
