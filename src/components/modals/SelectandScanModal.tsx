import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {shadows} from "../../styles/styles";
import CustomButton from "../forms/buttons/CustomButton";
import {useDocumentHooks} from "../../hooks/documentHooks";
import ScanModal from "./ScanModal";
import {useAppSelector} from "../../store/store";
import CustomCheckBox from "../forms/inputs/CustomCheckBox";
import ScanBinAndItemModal from "./ScanBinAndItemModal";

interface SelectScanModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: any;
  title: string;
  propertiesToShow: {name: string; label: string}[];
  customContent: JSX.Element;
  scanOptions?: {
    scanModal: boolean;
    showPending: boolean;
    scanCounted: boolean;
    scanModalDetails?: {title: string; placeholder: string};
  };
  checkBoxOptions: {
    pending: {
      showPending: boolean;
      togglePending: () => void;
    };
    counted: {
      showCounted: boolean;
      toggleCounted: () => void;
    };
  };
}

const SelectandScanModal = React.memo((props: SelectScanModalProps) => {
  const {
    visible,
    onClose,
    selectedItem,
    title,
    propertiesToShow,
    customContent,
    scanOptions,
    checkBoxOptions,
  } = props;
  const {isScanModal} = useAppSelector((state) => state.modal);
  const {handleScanModal} = useDocumentHooks();

  if (selectedItem) {
    return (
      <Modal visible={visible} onRequestClose={onClose} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{title}</Text>
            </View>

            {scanOptions?.scanModal && (
              <>
                <CustomButton
                  title={scanOptions.scanModalDetails?.title || ""}
                  onPress={handleScanModal}
                  type="regular"
                />

                <ScanBinAndItemModal
                  visible={isScanModal}
                  onClose={handleScanModal}
                  placeholder={scanOptions.scanModalDetails?.placeholder || ""}
                />
              </>
            )}

            <View style={[shadows.boxShadow, styles.propertiesContainer]}>
              {propertiesToShow.map((propertyObj) => (
                <View key={propertyObj.name} style={styles.properties}>
                  <Text style={styles.label}>{propertyObj.label}: </Text>
                  <Text>{selectedItem[propertyObj.name]}</Text>
                </View>
              ))}

              {checkBoxOptions.counted.showCounted && (
                <View style={styles.properties}>
                  <Text style={styles.label}>Scanned/Counted: </Text>
                  <Text>{`0/0`}</Text>
                </View>
              )}
            </View>

            {/* change the values based on the item */}
            <View
              style={[
                {
                  flexDirection: "row",
                  borderBlockColor: "#ccc",
                  alignItems: "center",
                  height: 80,
                },
                shadows.boxShadow,
              ]}
            >
              <CustomCheckBox
                label="Show Pending"
                isChecked={checkBoxOptions.pending.showPending}
                onToggle={checkBoxOptions.pending.togglePending}
              />
              <CustomCheckBox
                label="Show Scanned/Counted"
                isChecked={checkBoxOptions.counted.showCounted}
                onToggle={checkBoxOptions?.counted.toggleCounted}
              />
            </View>

            <ScrollView style={styles.customContainer}>
              {customContent}
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
  modalView: {
    backgroundColor: "white",
    padding: 20,
    // borderRadius: 10,
    height: "100%",
    width: "100%",
    gap: 10,
  },
  topContainer: {
    gap: 10,
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
  headerContainer: {
    flexDirection: "row",
    gap: 20,
  },
  propertiesContainer: {
    padding: 20,
  },
  customContainer: {
    // borderWidth: 1,
    width: "100%",
  },
  properties: {
    flexDirection: "row",
    gap: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
  },
});

export default SelectandScanModal;
