import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {shadows} from "../../styles/styles";
import LoadingSpinner from "../load-spinner/LoadingSpinner";
import {useAppSelector} from "../../store/store";
import MessageToast from "../message-toast/MessageToast";

interface SelectModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: any;
  title: string;
  propertiesToShow: {name: string; label: string}[];
  customContent: JSX.Element;
  loadingStatus?: boolean;
}

const SelectModal = React.memo((props: SelectModalProps) => {
  const {
    visible,
    onClose,
    selectedItem,
    title,
    propertiesToShow,
    customContent,
    loadingStatus,
  } = props;
  const {status, statusText} = useAppSelector((state) => state.status);

  // if (loadingStatus) {
  //   return <LoadingSpinner />;
  // }
  console.log(statusText);

  if (selectedItem) {
    return (
      <Modal visible={visible} onRequestClose={onClose} transparent>
        {status === "success" && (
          <MessageToast
            status="success"
            text={statusText}
            speed={2500}
            customPosition={[-150, -10]}
          />
        )}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{title}</Text>
            </View>

            <View style={[shadows.boxShadow, styles.propertiesContainer]}>
              {propertiesToShow.map((propertyObj) => (
                <View key={propertyObj.name} style={styles.properties}>
                  <Text style={styles.label}>{propertyObj.label}: </Text>
                  <Text>{selectedItem[propertyObj.name]}</Text>
                </View>
              ))}
            </View>

            {loadingStatus ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ScrollView style={styles.customContainer}>
                {customContent}
              </ScrollView>
            )}
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
    gap: 15,
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
