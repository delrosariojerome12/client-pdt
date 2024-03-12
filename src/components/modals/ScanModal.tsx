import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CustomInputs from "../forms/inputs/CustomInputs";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {FontAwesome5} from "@expo/vector-icons";
import {ScanCategory} from "../../models/generic/ScanCategory";
import {ScanValidate} from "../../hooks/documentHooks";
import CustomLoadingText from "../load-spinner/CustomLoadingText";
import {useAppSelector} from "../../store/store";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  placeholder: string;
  isNextBtn?: boolean;
  scanParams: ScanCategory;
  typeForFetching: ScanValidate;
}

const ScanModal = React.memo((props: ScanModalProps) => {
  const {status} = useAppSelector((state) => state.status);
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {handleScanDocument, validateBin} = useDocumentHooks();
  const {
    visible,
    onClose,
    placeholder,
    isNextBtn,
    scanParams,
    typeForFetching,
  } = props;
  const [scanfield, setScanfield] = useState<string>("");

  //
  const [binfield, setBinfield] = useState<string>("");
  // const [itemDetails, setItemDetails] = useState<any | null>(null);

  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  const handleBinChange = (key: string, value: string | number) => {
    setBinfield(String(value));
  };

  const renderButtons = () => {
    if (isNextBtn) {
      return (
        <CustomButton
          onPress={() => {
            handleScanDocument(
              {barcode: scanfield, category: scanParams},
              typeForFetching
            );
          }}
          isDisable={selectedDocument ? true : false}
          title="NEXT"
          type="regular"
          isWidthNotFull={true}
        />
      );
    }
    return (
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() =>
            handleScanDocument(
              {barcode: scanfield, category: scanParams},
              typeForFetching
            )
          }
          title="Continue"
          type="regular"
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
    );
  };

  console.log("scan modal");

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.centeredView}>
        {status === "loading" && (
          <CustomLoadingText text="Searching..." visible={true} />
        )}

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Scan Barcode</Text>
            </View>

            <CustomInputs
              isEditable={selectedDocument ? false : true}
              onSubmit={() => {
                handleScanDocument(
                  {barcode: scanfield, category: scanParams},
                  typeForFetching
                );
              }}
              onInputChange={handleOnChange}
              inputValue={scanfield}
              type="text"
              placeHolder={placeholder}
              inputKey="scan"
            />

            {renderButtons()}

            {selectedDocument && (
              <>
                <View style={styles.itemContainer}>
                  <Text style={styles.floatingText}>Item Details</Text>
                  <Text>{`Int No.: ${selectedDocument.intnum}`}</Text>
                  <Text>{`TO No.: ${selectedDocument.docnum}`}</Text>
                  <Text>{`Item Code: ${selectedDocument.itmcde}`}</Text>
                  <Text>{`Description: ${selectedDocument.itmdsc}`}</Text>
                  <Text>{`Qty: ${selectedDocument.itmqty}`}</Text>
                  <Text>{`UOM: ${selectedDocument.untmea}`}</Text>
                  <Text>{`Batch No.: ${selectedDocument.batchnum}`}</Text>
                  <Text>{`Mfg. Date: ${selectedDocument.mfgdte}`}</Text>
                  <Text>{`Exp. Date: ${selectedDocument.expdte}`}</Text>
                  <Text>{`Bin No.: ${selectedDocument.binnum2}`}</Text>
                  <Text>{`LPN: ${selectedDocument.lpnnum}`}</Text>
                </View>

                <CustomInputs
                  onInputChange={handleBinChange}
                  inputValue={binfield}
                  type="text"
                  placeHolder={"Scan Bin No."}
                  inputKey="bin"
                  onSubmit={() => validateBin(binfield)}
                />

                <CustomButton
                  onPress={() => validateBin(binfield)}
                  title="VALIDATE"
                  type="save"
                  isWidthNotFull={true}
                />
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
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

export default ScanModal;
