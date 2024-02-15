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
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useAppSelector} from "../../store/store";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
}

const ItemScanModal = (props: ScanModalProps) => {
  const {selectedItem: item} = useAppSelector((state) => state.document);
  const {handleScan} = useDocumentHooks();

  const [scanfield, setScanfield] = useState<string>("");
  const [quantityField, setQuantityField] = useState<number>(1);

  const {visible, onClose} = props;

  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  const handleOnQuantityChange = (key: string, value: number | string) => {
    setQuantityField(parseInt(value as any));
  };

  if (item) {
    return (
      <Modal visible={visible} onRequestClose={onClose} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <View style={{flexDirection: "row", gap: 10}}>
                <Ionicons name="scan" size={24} color="black" />
                <Text style={styles.headerText}>Scan Barcode</Text>
              </View>
            </View>

            <CustomInputs
              onInputChange={handleOnChange}
              inputValue={scanfield}
              type="text"
              placeHolder="Waiting to Scan Barcode..."
              inputKey="scan"
            />

            <View style={styles.quantityContainer}>
              <Text>Quantity: </Text>
              <CustomInputs
                onInputChange={handleOnQuantityChange}
                inputValue={quantityField}
                type="numeric"
                placeHolder="Quantity"
                inputKey="quantity"
                customWidth={252}
              />
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
                Item Details
              </Text>
              <Text>Line no: 2</Text>
              <Text>Item Code: {item.itemCode}</Text>
              <Text>Item Description: {item.itemName}</Text>
              <Text>Int Quantity: {`${item.pieces} PCS`}</Text>
              <Text>
                Receieved Quantity: {`Receieved Qty: ${item.receiveQty}`}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={handleScan}
                title="NEXT"
                type="regular"
                isWidthNotFull={true}
              />
              <CustomButton
                onPress={onClose}
                title="CLOSE"
                type="delete"
                isWidthNotFull={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

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
    // borderWidth: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    // borderWidth: 1,
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
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25,
  },
});

export default ItemScanModal;
