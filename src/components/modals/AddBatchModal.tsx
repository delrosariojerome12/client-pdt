import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomButton from "../forms/buttons/CustomButton";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";
import {format} from "../../styles/styles";
import {useAppSelector} from "../../store/store";
import {formatDateDDMMYYYY} from "../../helper/Date";
import {useBatchHooks} from "../../hooks/batchHooks";
import CustomLoadingText from "../load-spinner/CustomLoadingText";

const AddBatchModal = React.memo(() => {
  const {selectedBatchItem: item} = useAppSelector((state) => state.document);
  const {isAddBatchModal} = useAppSelector((state) => state.modal);
  const {status} = useAppSelector((state) => state.status);

  const {
    batchNo,
    expDate,
    mfgDate,
    batchedSaved,
    handleEditBatchModal,
    handlePostAnotherBatch,
    handleCloseAddBatchModal,
  } = useBatchHooks();

  console.log(item);

  if (item) {
    console.log("add batch modal");
    return (
      <>
        {status === "loading" && (
          <CustomLoadingText text="Updating Batch.." visible={true} />
        )}
        <Modal
          visible={isAddBatchModal}
          onRequestClose={handleCloseAddBatchModal}
          transparent
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleCloseAddBatchModal}>
                  <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{flexDirection: "row", gap: 10}}>
                  <Text style={styles.headerText}>Add Another Batch No.</Text>
                </View>
              </View>

              <View style={styles.item}>
                <Text
                  style={{
                    position: "absolute",
                    top: -10,
                    left: 10,
                    backgroundColor: "#fff",
                  }}
                >
                  <Text>{`${item.lpnnum}`}</Text>
                </Text>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Line No: </Text>
                  <Text>{item.linenum}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Item Code: </Text>
                  <Text>{item.itmcde}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Item Description: </Text>
                  <Text> {item.itmdsc}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Received Quantity: </Text>
                  <Text> {`${item.itmqty} PCS`}</Text>
                </View>

                <View
                  style={{flexDirection: "row", gap: 10, alignItems: "center"}}
                >
                  <View style={{gap: 10}}>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                      <Text>{batchedSaved && batchNo}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                      <Text>{batchedSaved && formatDateDDMMYYYY(mfgDate)}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                      <Text>{batchedSaved && formatDateDDMMYYYY(expDate)}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      console.log(batchNo);
                      handleEditBatchModal(item, "create");
                    }}
                  >
                    <FontAwesome name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={handlePostAnotherBatch}
                  title="SAVE"
                  type="save"
                  isWidthNotFull={true}
                  useFlex={true}
                />
                <CustomButton
                  onPress={handleCloseAddBatchModal}
                  title="CLOSE"
                  type="delete"
                  isWidthNotFull={true}
                  useFlex={true}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scanContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    gap: 40,
    width: "100%",
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
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 20,
  },
  item: {
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25,
  },
});

export default AddBatchModal;
