import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {FontAwesome5} from "@expo/vector-icons";
import {format} from "../../styles/styles";
import BatchDetails from "./BatchDetails";
import {ScanCategory} from "../../models/generic/ScanCategory";
import {ScanValidate} from "../../hooks/documentHooks";
import {useAppSelector, useAppDispatch} from "../../store/store";
import {
  formatDateDDMMYYYY,
  formatDateMMDDYYYY,
  formatDateStringMMDDYYYY,
} from "../../helper/Date";
import {clearBatchDetails} from "../../reducers/generalReducer";
import {handleBinItemDetails} from "../../reducers/documentReducer";
import MessageToast from "../message-toast/MessageToast";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  placeholder: string;
  scanParams: ScanCategory;
  typeForFetching: ScanValidate;
}

const ScanBinAndItemModal = React.memo((props: ScanModalProps) => {
  const {visible, onClose, placeholder, scanParams, typeForFetching} = props;
  const {handleScanItem} = useDocumentHooks();
  const {selectedBinDetails} = useAppSelector((state) => state.document);
  const {batchDetails} = useAppSelector((state) => state.general);
  const {status, statusText} = useAppSelector((state) => state.status);

  const dispatch = useAppDispatch();

  const [binNo, setBinNo] = useState<string>("");
  const [itemBarcode, setItemBarcode] = useState<string>("");

  const [quantityField, setQuantityField] = useState<number>(1);

  const handleItemBarcodeChange = (key: string, value: string | number) => {
    setItemBarcode(String(value));
  };

  const handleBinNoChange = (key: string, value: string | number) => {
    setBinNo(String(value));
  };

  const handleQuantityChange = (key: string, value: string | number) => {
    setQuantityField(Number(value));
  };

  const clearValues = () => {
    setQuantityField(1);
    setBinNo("");
    setItemBarcode("");
    dispatch(clearBatchDetails());
    dispatch(handleBinItemDetails(null));
  };

  const submit = (scanLevel: string, customMessage: string) => {
    if (!itemBarcode && scanLevel === "2") {
      Alert.alert("Empty Field", "Please make sure barcode is not empty.", [
        {
          text: "OK",
        },
      ]);
      return;
    }
    if (quantityField == 0 && scanLevel === "2.1") {
      Alert.alert(
        "Empty Field",
        "Please make sure Quantity is not less than 1.",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }
    if (scanLevel === "2.1") {
      clearValues();
    }
    handleScanItem(
      {
        barcode: binNo,
        receiveQty: quantityField,
        customMessage: customMessage,
        barcodelvl2: itemBarcode,
        scanlevel: scanLevel,
      },
      typeForFetching
    );
  };

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => {
          onClose();
          clearValues();
        }}
        transparent
      >
        {status === "success" && (
          <MessageToast
            status="success"
            text={"Item Successfully Scanned."}
            speed={2500}
            customPosition={[-150, -10]}
          />
        )}
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    onClose();
                    clearValues();
                  }}
                >
                  <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Scan Barcode</Text>
              </View>

              <CustomInputs
                onInputChange={handleBinNoChange}
                inputValue={binNo}
                type="text"
                placeHolder={placeholder}
                inputKey="binNo"
                onSubmit={() => {
                  submit("1", "Please Make sure Bin No. Barcode is not empty.");
                }}
                isEditable={selectedBinDetails ? false : true}
                isFocus={true}
              />

              {!selectedBinDetails && (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    onPress={() => {
                      submit(
                        "1",
                        "Please Make sure Bin No. Barcode is not empty."
                      );
                    }}
                    title="Next"
                    type="save"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                  <CustomButton
                    onPress={() => {
                      onClose();
                      clearValues();
                    }}
                    title="Close"
                    type="delete"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                </View>
              )}

              {/* bin details */}
              {selectedBinDetails && (
                <>
                  <View style={styles.itemContainer}>
                    <Text style={styles.floatingText}>Bin Item Details</Text>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Line No. :</Text>
                      <Text>{selectedBinDetails.linenum}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Item Code:</Text>
                      <Text>{selectedBinDetails.itmcde}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Description:</Text>
                      <Text>{selectedBinDetails.itmdsc}</Text>
                    </View>

                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                      <Text>{selectedBinDetails.batchnum}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                      <Text>
                        {formatDateStringMMDDYYYY(selectedBinDetails.mfgdte)}
                      </Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                      <Text>
                        {formatDateStringMMDDYYYY(selectedBinDetails.expdte)}
                      </Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
                      <Text>{selectedBinDetails.binnum}</Text>
                    </View>

                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Qty:</Text>
                      <Text>{selectedBinDetails.itmqty}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>UOM:</Text>
                      <Text>{selectedBinDetails.untmea}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Scanned Qty:</Text>
                    </View>
                  </View>

                  <CustomInputs
                    onInputChange={handleItemBarcodeChange}
                    inputValue={itemBarcode}
                    type="text"
                    placeHolder={"Waiting to Scan Item Barcode..."}
                    inputKey="bin"
                    onSubmit={() => {
                      submit(
                        "2",
                        "Please Make sure Item Barcode is not empty."
                      );
                    }}
                    isEditable={batchDetails.batchNo ? false : true}
                  />

                  {!batchDetails.batchNo && (
                    <View style={styles.buttonContainer}>
                      <CustomButton
                        onPress={() => {
                          submit(
                            "2",
                            "Please Make sure Item Barcode is not empty."
                          );
                        }}
                        title="Next"
                        type="save"
                        isWidthNotFull={true}
                        useFlex={true}
                      />
                      <CustomButton
                        onPress={() => {
                          onClose();
                          clearValues();
                        }}
                        title="Close"
                        type="delete"
                        isWidthNotFull={true}
                        useFlex={true}
                      />
                    </View>
                  )}
                </>
              )}

              {/* scan item details */}
              {batchDetails.batchNo && (
                <>
                  <View style={styles.itemContainer}>
                    <Text style={styles.floatingText}>
                      Scanned Item Details
                    </Text>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Item Code:</Text>
                      <Text>{selectedBinDetails.itmcde}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Description:</Text>
                      <Text>{selectedBinDetails.itmdsc}</Text>
                    </View>

                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                      <Text>{batchDetails.batchNo}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                      <Text>{formatDateMMDDYYYY(batchDetails.mfgDate)}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                      <Text>{formatDateMMDDYYYY(batchDetails.mfgDate)}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
                      <Text>{selectedBinDetails.binnum}</Text>
                    </View>
                  </View>

                  <CustomInputs
                    onInputChange={handleQuantityChange}
                    inputValue={quantityField}
                    type="numeric"
                    placeHolder={"Waiting to Scan Item Barcode..."}
                    inputKey="quantity"
                  />

                  <View style={styles.buttonContainer}>
                    <CustomButton
                      onPress={() => {
                        submit(
                          "2.1",
                          "Please Make sure Bin No. Barcode is not empty."
                        );
                        // onClose();
                      }}
                      title="Continue"
                      type="save"
                      isWidthNotFull={true}
                      useFlex={true}
                    />
                    <CustomButton
                      onPress={() => {
                        onClose();
                        clearValues();
                      }}
                      title="Close"
                      type="delete"
                      isWidthNotFull={true}
                      useFlex={true}
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    gap: 20,
    width: "100%",
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
  itemContainer: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 50 / 10,
    gap: 10,
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
  floatingText: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#fff",
  },
});

export default ScanBinAndItemModal;
