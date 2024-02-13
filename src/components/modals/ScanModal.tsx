import React, {useState} from "react";
import {Modal, View, Text, Button, StyleSheet} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
}

const ScanModal = (props: ScanModalProps) => {
  const {handleScan} = useDocumentHooks();

  const {visible, onClose} = props;
  const [scanfield, setScanfield] = useState<string>("");

  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Scan Barcode</Text>
          <CustomInputs
            onInputChange={handleOnChange}
            inputValue={scanfield}
            type="text"
            placeHolder="Waiting to Scan Barcode..."
            inputKey="scan"
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={handleScan}
              title="Continue"
              type="regular"
              isWidthNotFull={true}
            />
            <CustomButton
              onPress={onClose}
              title="Close"
              type="delete"
              isWidthNotFull={true}
            />
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
    height: "40%",
    gap: 10,
    width: "80%",
    justifyContent: "space-evenly",
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

export default ScanModal;
