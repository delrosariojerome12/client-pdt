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
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {FontAwesome5} from "@expo/vector-icons";
import {format} from "../../styles/styles";
import BatchDetails from "./BatchDetails";
interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  placeholder: string;
}

const ScanBinAndItemModal = React.memo((props: ScanModalProps) => {
  const {handleScan} = useDocumentHooks();
  const {visible, onClose, placeholder} = props;
  // barcodes
  const [binNo, setBinNo] = useState<string>("");
  const [itemBarcode, setItemBarcode] = useState<string>("");

  // item from the barcodes
  const [binItemDetails, setBinItemDetails] = useState<any | null>(null);
  const [scanItemDetails, setScanItemDetails] = useState<any | null>(null);
  const [quantityField, setQuantityField] = useState<number>(1);
  const [isBatchDetailsOpen, setBatchDetailsOpen] = useState(false);

  // {
  // itemCode: "ABC123",
  // itemName: "Item 1",
  // pieces: 5,
  // receiveQty: 5,
  // LPNNumber: "LPN123",
  // batchNumber: "BATCH001",
  // mfgDate: "2023-01-01",
  // expDate: "2024-12-31",
  // }

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
    setBinItemDetails(null);
    setScanItemDetails(null);
    setBinNo("");
    setItemBarcode("");
    setBatchDetailsOpen(false);
  };

  const handleSetBatchNum = (batchnum: string, item: any) => {
    setBatchDetailsOpen(false);
    setItemBarcode(batchnum);
    setScanItemDetails(item);
  };

  return (
    <>
      <Modal visible={visible} onRequestClose={onClose} transparent>
        <View style={styles.centeredView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onClose}>
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
              />

              {/* buttons */}
              {!binItemDetails && (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    // onPress={handleScan}
                    onPress={() =>
                      setBinItemDetails({
                        itemCode: "ABC123",
                        itemName: "Item 1",
                        pieces: 5,
                        receiveQty: 5,
                        LPNNumber: "LPN123",
                        batchNumber: "BATCH001",
                        mfgDate: "2023-01-01",
                        expDate: "2024-12-31",
                      })
                    }
                    title="Next"
                    type="save"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                  <CustomButton
                    onPress={onClose}
                    title="Close"
                    type="delete"
                    isWidthNotFull={true}
                    useFlex={true}
                  />
                </View>
              )}

              {/* bin details */}
              {binItemDetails && (
                <>
                  <View style={styles.itemContainer}>
                    <Text style={styles.floatingText}>Bin Item Details</Text>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Line No. :</Text>
                      <Text>{binItemDetails.itemCode}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Item Code:</Text>
                      <Text>{binItemDetails.itemCode}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Description:</Text>
                      <Text>{binItemDetails.itemName}</Text>
                    </View>

                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                      <Text>{binItemDetails.batchNumber}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                      <Text>{binItemDetails.expDate}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                      <Text>{binItemDetails.mfgDate}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
                      <Text>{binItemDetails.batchNumber}</Text>
                    </View>

                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Qty:</Text>
                      <Text>{binItemDetails.pieces}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Scanned Qty:</Text>
                      <Text>{0}</Text>
                    </View>
                  </View>

                  <CustomInputs
                    onInputChange={handleItemBarcodeChange}
                    inputValue={itemBarcode}
                    type="text"
                    placeHolder={"Waiting to Scan Item Barcode..."}
                    inputKey="bin"
                  />

                  {/* buttons */}
                  {!scanItemDetails && (
                    <View style={styles.buttonContainer}>
                      <CustomButton
                        onPress={() => setBatchDetailsOpen(!isBatchDetailsOpen)}
                        title="Next"
                        type="save"
                        isWidthNotFull={true}
                        useFlex={true}
                      />
                      <CustomButton
                        // onPress={onClose}
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
              {scanItemDetails && (
                <>
                  <View style={styles.itemContainer}>
                    <Text style={styles.floatingText}>
                      Scanned Item Details
                    </Text>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Item Code:</Text>
                      <Text>{binItemDetails.itemCode}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Description:</Text>
                      <Text>{binItemDetails.itemName}</Text>
                    </View>

                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                      <Text>{binItemDetails.batchNumber}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                      <Text>{binItemDetails.expDate}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                      <Text>{binItemDetails.mfgDate}</Text>
                    </View>
                    <View style={format.twoRowText}>
                      <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
                      <Text>{binItemDetails.batchNumber}</Text>
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
                        handleScan();
                        clearValues();
                        onClose();
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

      {/* batch modals */}
      {isBatchDetailsOpen && (
        <BatchDetails
          visible={isBatchDetailsOpen}
          item={binItemDetails}
          onClose={() => setBatchDetailsOpen(false)}
          onSave={handleSetBatchNum}
        />
      )}
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
