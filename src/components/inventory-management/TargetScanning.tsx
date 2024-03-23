import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../store/store";
import CustomButton from "../forms/buttons/CustomButton";
import { useDocumentHooks } from "../../hooks/documentHooks";
import { format } from "../../styles/styles";
import MessageToast from "../message-toast/MessageToast";
import { ScanValidate } from "../../hooks/documentHooks";
import CustomLoadingText from "../load-spinner/CustomLoadingText";
import { ScanOptions } from "../list-holder/ItemsList";
import { useModalHooks } from "../../hooks/modalHooks";

interface ScanModalProps {
  visible: boolean;
  scanType: ScanValidate;
  options?: ScanOptions;
}

const TargetScanning = React.memo((props: ScanModalProps) => {
  const { selectedItem } = useAppSelector((state) => state.document);
  const { handleScanItem } = useDocumentHooks();
  const item: any = selectedItem;
  const { status } = useAppSelector((state) => state.status);
  const { toggleTargetScanning } = useModalHooks();

  const [scanfield, setScanfield] = useState<string>("");

  const { visible, scanType, options } = props;
  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  console.log("item scan modal");

  if (item) {
    return (
      <Modal
        visible={visible}
        onRequestClose={toggleTargetScanning}
        transparent
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {status === "loading" && (
              <CustomLoadingText text="Processing..." visible={true} />
            )}

            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={toggleTargetScanning}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Ionicons name="scan" size={24} color="black" />
                <Text style={styles.headerText}>Scan Barcode</Text>
              </View>
            </View>

            <CustomInputs
              onInputChange={handleOnChange}
              inputValue={scanfield}
              type="text"
              placeHolder="Waiting to Scan Target Bin No. Barcode..."
              inputKey="scan"
              isFocus={true}
              onSubmit={() => {
                handleScanItem(
                  { barcode: scanfield, receiveQty: 1 },
                  "sloc-bin"
                );
              }}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={() => {
                  setScanfield("");
                  handleScanItem(
                    { barcode: scanfield, receiveQty: 1 },
                    "sloc-bin"
                  );
                }}
                title="NEXT"
                type="regular"
                isWidthNotFull={true}
                useFlex={true}
              />
              <CustomButton
                onPress={toggleTargetScanning}
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
    gap: 20,
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

export default TargetScanning;
