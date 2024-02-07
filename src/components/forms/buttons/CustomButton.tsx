import {Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  type: "regular" | "delete" | "edit" | "save";
}

const CustomButton = (props: CustomButtonProps) => {
  const {onPress, title, type} = props;

  const getButtonStyle = () => {
    switch (type) {
      case "regular":
        return styles.regular;
      case "delete":
        return styles.delete;
      case "edit":
        return styles.edit;
      case "save":
        return styles.save;
      default:
        return styles.regular;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: "100%",
    padding: 12,
  },
  regular: {
    backgroundColor: "#007bff",
  },
  save: {
    backgroundColor: "#28a745",
  },
  delete: {
    backgroundColor: "#dc3545",
  },
  edit: {
    backgroundColor: "#ffc107",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
