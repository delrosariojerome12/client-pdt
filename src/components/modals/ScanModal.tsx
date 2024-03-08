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
import {TypeSelect} from "../../hooks/documentHooks";
import CustomLoadingText from "../load-spinner/CustomLoadingText";
import {useAppSelector} from "../../store/store";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  placeholder: string;
  isNextBtn?: boolean;
  scanParams: ScanCategory;
  typeForFetching: TypeSelect;
}

const ScanModal = React.memo((props: ScanModalProps) => {
  const {status} = useAppSelector((state) => state.status);
  const {handleScan, validateBin} = useDocumentHooks();
  const {
    visible,
    onClose,
    placeholder,
    isNextBtn,
    scanParams,
    typeForFetching,
  } = props;
  const [scanfield, setScanfield] = useState<string>("");
  // const [binfield, setBinfield] = useState<string>("");
  // const [itemDetails, setItemDetails] = useState<any | null>(null);

  const handleOnChange = (key: string, value: string | number) => {
    setScanfield(String(value));
  };

  // const handleBinChange = (key: string, value: string | number) => {
  // setBinfield(String(value));
  // };

  const renderButtons = () => {
    // if (!itemDetails) {
    if (isNextBtn) {
      return (
        <CustomButton
          onPress={() =>
            handleScan(
              {barcode: scanfield, category: scanParams.category},
              typeForFetching
            )
          }
          title="Next"
          type="regular"
          isWidthNotFull={true}
          useFlex={true}
        />
      );
    }
    return (
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() =>
            handleScan(
              {barcode: scanfield, category: scanParams.category},
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
    // }
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

            {/* <View> */}
            <CustomInputs
              onSubmit={() => {
                handleScan(
                  {barcode: scanfield, category: scanParams.category},
                  typeForFetching
                );
              }}
              onInputChange={handleOnChange}
              inputValue={scanfield}
              type="text"
              placeHolder={placeholder}
              inputKey="scan"
            />
            {/* </View> */}

            {renderButtons()}

            {/* {itemDetails && (
              <>
                <View style={styles.itemContainer}>
                  <Text style={styles.floatingText}>Item Details</Text>
                  <Text>{`Item No: ${itemDetails.itemCode}`}</Text>
                  <Text>{`Item No: ${itemDetails.itemCode}`}</Text>
                  <Text>{`Item name: ${itemDetails.itemName}`}</Text>
                  <Text>{`PCS: ${itemDetails.pieces}`}</Text>
                  <Text>{`Batch No.: ${itemDetails.batchNumber}`}</Text>
                  <Text>{`Mfg. Date: ${itemDetails.expDate}`}</Text>
                  <Text>{`Exp. Date: ${itemDetails.mfgDate}`}</Text>
                </View>

                <CustomInputs
                  onInputChange={handleBinChange}
                  inputValue={binfield}
                  type="text"
                  placeHolder={"Scan Bin No."}
                  inputKey="bin"
                />

                <CustomButton
                  onPress={validateBin}
                  title="VALIDATE"
                  type="save"
                  isWidthNotFull={true}
                />
              </>
            )} */}
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
