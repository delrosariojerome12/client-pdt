import React, {useState} from "react";
import {Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import CustomButton from "../forms/buttons/CustomButton";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";
import {format} from "../../styles/styles";
import {useAppSelector} from "../../store/store";
import EditBatchModal from "./EditBatchModal";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {formatDateDDMMYY} from "../../helper/Date";
import {useBatchHooks} from "../../hooks/batchHooks";

interface AddBatchModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddBatchModal = React.memo(({onClose, visible}: AddBatchModalProps) => {
  const {selectedBatchItem: item} = useAppSelector((state) => state.document);
  const {isEditBatchModal} = useAppSelector((state) => state.modal);
  const {
    batchNo,
    expDate,
    mfgDate,
    saved,
    handleBatchNo,
    handleExpDate,
    handleMfgDate,
    handleClose,
    handleSave,
    handleEditBatchModal,
  } = useBatchHooks({uses: "create"});

  const {handlePost} = useDocumentHooks();

  if (item) {
    console.log("add batch modal");
    return (
      <>
        <Modal visible={visible} onRequestClose={onClose} transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onClose}>
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
                  <Text>{item.copyline}</Text>
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
                  <Text style={{fontWeight: "bold"}}>Int Quantity: </Text>
                  <Text> {`${item.intqty} PCS`}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Receieved Quantity: </Text>
                  <Text> {`${item.itmqty} PCS`}</Text>
                </View>

                <View
                  style={{flexDirection: "row", gap: 10, alignItems: "center"}}
                >
                  <View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                      <Text>{saved && batchNo}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                      <Text>{saved && formatDateDDMMYY(mfgDate)}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                      <Text>{saved && formatDateDDMMYY(expDate)}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      handleEditBatchModal(item);
                    }}
                  >
                    <FontAwesome name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => {
                    handlePost({
                      item: item,
                      type: "pto-add-batch",
                      customMessage: {
                        header: "Add Another PTO Batch Saving",
                        body: "Do you want to save this details?",
                      },
                    });
                  }}
                  title="SAVE"
                  type="save"
                  isWidthNotFull={true}
                  useFlex={true}
                />
                <CustomButton
                  onPress={onClose}
                  title="CLOSE"
                  type="delete"
                  isWidthNotFull={true}
                  useFlex={true}
                />
              </View>
            </View>
          </View>
        </Modal>

        {isEditBatchModal && (
          <EditBatchModal
            isEmpty={true}
            visible={isEditBatchModal}
            onClose={handleClose}
            onSave={handleSave}
            batchData={{
              batchNo,
              mfgDate,
              expDate,
              handleBatchNo,
              handleExpDate,
              handleMfgDate,
            }}
          />
        )}
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
