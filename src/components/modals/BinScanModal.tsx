import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useAppSelector} from "../../store/store";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {format} from "../../styles/styles";

interface BinScanModalProps {
  visible: boolean;
  onClose: () => void;
}
const BinScanModal = (props: BinScanModalProps) => {
  const {selectedItem: item} = useAppSelector((state) => state.document);
  const {handleScan} = useDocumentHooks();

  const [scanBinfield, setScanBinfield] = useState<string>("");
  const [scanItemfield, setScanItemfield] = useState<string>("");

  const [quantityField, setQuantityField] = useState<number>(1);

  const {visible, onClose} = props;

  const handleOnChange = (key: string, value: string | number) => {
    setScanBinfield(String(value));
  };

  const handleOnItemFieldChange = (key: string, value: string | number) => {
    setScanItemfield(String(value));
  };

  const handleOnQuantityChange = (key: string, value: number | string) => {
    setQuantityField(parseInt(value as any));
  };

  if (item) {
    return (
      <Modal visible={visible} onRequestClose={onClose} transparent>
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                inputValue={scanBinfield}
                type="text"
                placeHolder="Waiting to Scan Bin No. Barcode..."
                inputKey="scan"
              />

              <View style={styles.item}>
                <Text
                  style={{
                    position: "absolute",
                    top: -10,
                    left: 15,
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Item Details
                </Text>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Line no:</Text>
                  <Text>{` 2`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Item Code:</Text>
                  <Text>{` ${item.itemCode}`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Description:</Text>
                  <Text>{` ${item.itemName}`}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                  <Text>{` ${item.batchNumber}`}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                  <Text>{` ${item.expDate}`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                  <Text>{` ${item.mfgDate}`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Bin No:</Text>
                  <Text>{`11111`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Qty:</Text>
                  <Text>{` ${item.pieces}`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{fontWeight: "bold"}}>Scanned Qty:</Text>
                  <Text>{` 0`}</Text>
                </View>
              </View>

              <CustomInputs
                onInputChange={handleOnItemFieldChange}
                inputValue={scanItemfield}
                type="text"
                placeHolder="Waiting to Scan Item Barcode..."
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

              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={handleScan}
                  title="CONTINUE"
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
          </ScrollView>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
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
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25,
    gap: 5,
  },
});

export default BinScanModal;
