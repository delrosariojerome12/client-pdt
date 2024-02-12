import React, {useState} from "react";
import {Modal, View, Text, Button, StyleSheet} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import CustomButton from "../forms/buttons/CustomButton";
import PTOItems from "../pto/ptoItems";

interface SelectModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: any;
}

const SelectModal = (props: SelectModalProps) => {
  const {visible, onClose, selectedItem} = props;

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Purchase Transfer Order Details</Text>
          <View>
            <Text>{selectedItem.docnum}</Text>
            <Text>{selectedItem.inrnum}</Text>
          </View>
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
    borderRadius: 10,
    height: "80%",
    gap: 10,
    width: "90%",
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
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SelectModal;
