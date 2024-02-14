import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {FontAwesome5} from "@expo/vector-icons";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  placeholder: string;
  isNextBtn?: boolean;
}

const ScanModal = React.memo((props: ScanModalProps) => {
  const {handleScan} = useDocumentHooks();

  const {visible, onClose, placeholder, isNextBtn} = props;
  const [scanfield, setScanfield] = useState<string>("");

  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome5 name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Scan Barcode</Text>
          </View>

          <View>
            <CustomInputs
              onInputChange={handleOnChange}
              inputValue={scanfield}
              type="text"
              placeHolder={placeholder}
              inputKey="scan"
            />
          </View>

          {isNextBtn ? (
            <CustomButton
              onPress={handleScan}
              title="Next"
              type="regular"
              isWidthNotFull={true}
            />
          ) : (
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
          )}
        </View>
      </View>
    </Modal>
  );
});

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
    // borderRadius: 10,
    height: "100%",
    gap: 10,
    width: "100%",
    // justifyContent: "space-evenly",
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
