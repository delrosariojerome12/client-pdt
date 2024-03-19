import React, {useState} from "react";
import {Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useAppSelector} from "../../store/store";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {format} from "../../styles/styles";
import MessageToast from "../message-toast/MessageToast";
import {ScanValidate} from "../../hooks/documentHooks";
import CustomLoadingText from "../load-spinner/CustomLoadingText";
import {ScanOptions} from "../list-holder/ItemsList";

interface ScanModalProps {
  visible: boolean;
  scanType: ScanValidate;
  options?: ScanOptions;
}

const ItemScanModal = React.memo((props: ScanModalProps) => {
  const {selectedItem} = useAppSelector((state) => state.document);
  const {closeItemScanModal, handleScanItem} = useDocumentHooks();
  const item: any = selectedItem;
  const {status} = useAppSelector((state) => state.status);

  const [scanfield, setScanfield] = useState<string>("");
  const [quantityField, setQuantityField] = useState<number>(1);

  const {visible, scanType, options} = props;
  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  const handleOnQuantityChange = (key: string, value: number | string) => {
    setQuantityField(parseInt(value as any));
  };

  console.log("item scan modal");

  if (item) {
    return (
      <Modal visible={visible} onRequestClose={closeItemScanModal} transparent>
        {status === "success" && (
          <MessageToast
            status="success"
            text="Item Successfully Scanned."
            speed={2000}
            customPosition={[-150, -10]}
          />
        )}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {status === "loading" && (
              <CustomLoadingText text="Processing..." visible={true} />
            )}

            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={closeItemScanModal}>
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
              isFocus={true}
              onSubmit={() => {
                setQuantityField(1);
                setScanfield("");
                handleScanItem(
                  {barcode: scanfield, receiveQty: quantityField},
                  scanType
                );
              }}
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
                <Text style={{fontWeight: "bold"}}>UOM: </Text>
                <Text> {item.untmea}</Text>
              </View>

              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Quantity: </Text>
                {options?.receivedQty ? (
                  <Text> {`${item.itmqty || ""}`}</Text>
                ) : (
                  <Text> {`${item.intqty || item.itemqty} `}</Text>
                )}
              </View>

              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Received Quantity: </Text>
                {options?.receivedQty ? (
                  <Text> {`${item[options.receivedQty]}`}</Text>
                ) : (
                  <Text> {`${item.itmqty}`}</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={() => {
                  setQuantityField(1);
                  setScanfield("");
                  handleScanItem(
                    {barcode: scanfield, receiveQty: quantityField},
                    scanType
                  );
                }}
                title="NEXT"
                type="regular"
                isWidthNotFull={true}
                useFlex={true}
              />
              <CustomButton
                onPress={closeItemScanModal}
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
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25,
  },
});

export default ItemScanModal;
