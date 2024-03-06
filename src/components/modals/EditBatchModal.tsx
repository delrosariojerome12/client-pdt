import React, {useEffect, useState} from "react";
import {Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import CustomButton from "../forms/buttons/CustomButton";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";
import {format} from "../../styles/styles";
import {useAppSelector} from "../../store/store";
import DateInput from "../forms/inputs/DateInput";
import InputWithSearch from "../forms/inputs/InputWithSearch";
import {useBatchHooks} from "../../hooks/batchHooks";
import BatchSearch from "./BatchSearch";

interface EditBatchModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  isEmpty: boolean;
  batchData: {
    batchNo: string;
    mfgDate: Date;
    expDate: Date;
    handleBatchNo: (batch: any) => void;
    handleMfgDate: (newDate: any) => void;
    handleExpDate: (newDate: any) => void;
  };
}
const EditBatchModal = React.memo(
  ({
    onClose,
    onSave,
    visible,
    isEmpty,
    batchData: {
      batchNo,
      expDate,
      handleBatchNo,
      handleExpDate,
      handleMfgDate,
      mfgDate,
    },
  }: EditBatchModalProps) => {
    const {selectedBatchItem: item} = useAppSelector((state) => state.document);
    const {isSearchBatchModal} = useAppSelector((state) => state.modal);

    const {handleSearchBatchModal, handleCloseSearchBatchModal} = useBatchHooks(
      {uses: "modals"}
    );

    if (isSearchBatchModal) {
      return (
        <BatchSearch
          onClose={handleCloseSearchBatchModal}
          onSaveBatch={handleBatchNo}
          visible={isSearchBatchModal}
        />
      );
    }

    console.log("edit batch modal");
    console.log(batchNo);

    return (
      <Modal visible={visible} onRequestClose={onClose} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <View style={{flexDirection: "row", gap: 10}}>
                <Text style={styles.headerText}>Batch Details</Text>
              </View>
            </View>

            <InputWithSearch
              label="Batch No."
              onShow={handleSearchBatchModal}
              text={batchNo}
              onTextChange={handleBatchNo}
            />

            <DateInput
              date={mfgDate}
              onChangeDate={handleMfgDate}
              inputPlaceholder="Mfg. Date"
            />
            <DateInput
              date={expDate}
              onChangeDate={handleExpDate}
              inputPlaceholder="Exp. Date"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={onSave}
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
    );
  }
);
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

export default EditBatchModal;
