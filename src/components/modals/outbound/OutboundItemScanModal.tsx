import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import CustomInputs from "../../forms/inputs/CustomInputs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../../store/store";
import CustomButton from "../../forms/buttons/CustomButton";
import { useDocumentHooks } from "../../../hooks/documentHooks";
import { format, generalStyles } from "../../../styles/styles";
import MessageToast from "../../message-toast/MessageToast";
import { ScanValidate } from "../../../hooks/documentHooks";
import CustomLoadingText from "../../load-spinner/CustomLoadingText";
import { useModalHooks } from "../../../hooks/modalHooks";
import { formatDateStringMMDDYYYY } from "../../../helper/Date";
import { ScanOptions } from "../../list-holder/ItemsList";

interface ScanModalProps {
  visible: boolean;
  scanType: ScanValidate;
  options?: ScanOptions;
}

const OutboundItemScanModal = React.memo((props: ScanModalProps) => {
  const { selectedItem } = useAppSelector((state) => state.document);
  const { toggleOutboundItemScan } = useModalHooks();
  const { handleScanItem } = useDocumentHooks();
  const item: any = selectedItem;
  const { status, isQuantityFieldShown, statusText } = useAppSelector(
    (state) => state.status
  );

  const [scanfield, setScanfield] = useState<string>("");
  const [itemBarcode, setItemBarcode] = useState<string>("");
  const [quantityField, setQuantityField] = useState<number>(1);

  const { visible, scanType, options } = props;

  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  const handleOnQuantityChange = (key: string, value: number | string) => {
    setQuantityField(parseInt(value as any));
  };

  const handleSubmit = (scanlevel: string) => {
    if (!quantityField) {
      return Alert.alert("Empty Field", "Invalid Qty.", [
        {
          text: "OK",
        },
      ]);
    }
    setQuantityField(1);
    if (item.itmqty - item.scanqty == quantityField) {
      setItemBarcode("");
    }
    handleScanItem(
      {
        barcode: scanfield,
        receiveQty: quantityField,
        barcodelvl2: itemBarcode,
        scanlevel: scanlevel,
      },
      scanType
    );
  };

  console.log(item);

  if (item) {
    return (
      <Modal
        visible={visible}
        onRequestClose={toggleOutboundItemScan}
        transparent
      >
        {status === "success" && (
          <MessageToast
            status="success"
            text={statusText || "Item Successfully Scanned."}
            speed={2000}
            customPosition={[-150, -10]}
          />
        )}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {status === "loading" && (
              <CustomLoadingText text="Processing..." visible={true} />
            )}

            <ScrollView contentContainerStyle={{ gap: 12 }}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={toggleOutboundItemScan}>
                  <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Ionicons name="scan" size={24} color="black" />
                  <Text style={styles.headerText}>Scan Barcode</Text>
                </View>
              </View>

              <CustomInputs
                isEditable={isQuantityFieldShown ? false : true}
                onInputChange={handleOnChange}
                inputValue={scanfield}
                type="text"
                placeHolder={
                  options?.scanUsage === "bin"
                    ? "Waiting to Scan Bin No. Barcode..."
                    : "Waiting to Scan Barcode..."
                }
                inputKey="scan"
                isFocus={true}
                onSubmit={() => {
                  handleSubmit("1");
                }}
              />

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
                  <Text style={{ fontWeight: "bold" }}>Line No: </Text>
                  <Text>{item.linenum}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Item Code: </Text>
                  <Text>{item.itmcde}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Description: </Text>
                  <Text>{item.itmdsc}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Batch No.:</Text>
                  <Text>{`${item.batchnum || "No BatchNo."}`}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Mfg. Date:</Text>
                  <Text>{`${
                    formatDateStringMMDDYYYY(item.mfgdte as string) || "No Date"
                  } `}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Exp. Date:</Text>
                  <Text>{`${
                    formatDateStringMMDDYYYY(item.expdte as string) || "No Date"
                  }`}</Text>
                </View>
                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Bin No.:</Text>
                  <Text>{`${item.binnum || item.binfrom} `}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Qty: </Text>
                  <Text> {`${item.itmqty || ""} `}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>UOM: </Text>
                  <Text> {`${item.untmea || ""}`}</Text>
                </View>

                <View style={format.twoRowText}>
                  <Text style={{ fontWeight: "bold" }}>Scanned Quantity: </Text>
                  <Text> {`${item.scanqty}`}</Text>
                </View>
              </View>

              {options?.showQuantity && (
                <View style={styles.quantityContainer}>
                  <Text>Quantity: </Text>
                  <CustomInputs
                    onInputChange={handleOnQuantityChange}
                    inputValue={quantityField}
                    type="numeric"
                    placeHolder="Quantity"
                    inputKey="quantity"
                    customWidth={252}
                    useFlex={true}
                  />
                </View>
              )}

              {isQuantityFieldShown ? (
                <>
                  <CustomInputs
                    onInputChange={(key: string, value: string | number) => {
                      setItemBarcode(String(value));
                    }}
                    inputValue={itemBarcode}
                    type="text"
                    placeHolder="Waiting To Scan Item Barcode"
                    inputKey="itemBarcode"
                    onSubmit={() => {
                      handleSubmit("2");
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
                      useFlex={true}
                    />
                  </View>

                  <View style={styles.buttonContainer}>
                    <CustomButton
                      onPress={() => {
                        handleSubmit("2");
                      }}
                      title="NEXT"
                      type="regular"
                      isWidthNotFull={true}
                      useFlex={true}
                    />
                    <CustomButton
                      onPress={toggleOutboundItemScan}
                      title="CLOSE"
                      type="delete"
                      isWidthNotFull={true}
                      useFlex={true}
                    />
                  </View>
                </>
              ) : (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    onPress={() => {
                      handleSubmit("1");
                    }}
                    title="NEXT"
                    type="regular"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                  <CustomButton
                    onPress={toggleOutboundItemScan}
                    title="CLOSE"
                    type="delete"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                </View>
              )}
            </ScrollView>
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
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25,
  },
});

export default OutboundItemScanModal;
