import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  Button,
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

interface SelectModalProps {
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
}

const SelectModal = React.memo((props: SelectModalProps) => {
  const {
    visible,
    onClose,
    selectedItem,
    title,
    propertiesToShow,
    customContent,
    scanOptions,
  } = props;

  const {isScanModal} = useAppSelector((state) => state.modal);
  const {handleScanModal} = useDocumentHooks();

  if (selectedItem) {
    console.log("xxx");

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

            <View>
              {scanOptions?.scanModal && (
                <>
                  <CustomButton
                    title={scanOptions.scanModalDetails?.title || ""}
                    onPress={handleScanModal}
                    type="regular"
                  />
                  <CustomCheckBox label="Show Pending" value={true} />

                  <ScanModal
                    visible={isScanModal}
                    onClose={handleScanModal}
                    placeholder={
                      scanOptions.scanModalDetails?.placeholder || ""
                    }
                  />
                </>
              )}
            </View>

            <View style={[shadows.boxShadow, styles.propertiesContainer]}>
              {propertiesToShow.map((propertyObj) => (
                <View key={propertyObj.name} style={styles.properties}>
                  <Text style={styles.label}>{propertyObj.label}: </Text>
                  <Text>{selectedItem[propertyObj.name]}</Text>
                </View>
              ))}
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
    gap: 20,
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

export default SelectModal;
