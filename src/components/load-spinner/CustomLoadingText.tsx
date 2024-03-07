import React from "react";
import {View, Text, ActivityIndicator, StyleSheet, Modal} from "react-native";

const CustomLoadingText = ({
  text,
  visible,
}: {
  text: string;
  visible: boolean;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.text}>{text}</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 20,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    width: 250,
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default CustomLoadingText;
