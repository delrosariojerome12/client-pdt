import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  type: "regular" | "delete" | "edit" | "save";
  isWidthNotFull?: boolean;
  isDisable?: boolean;
  fontSize?: number;
  useFlex?: boolean;
}

const CustomButton = (props: CustomButtonProps) => {
  const { onPress, title, type, isWidthNotFull, isDisable, fontSize, useFlex } =
    props;

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

  const styles = StyleSheet.create({
    button: {
      borderRadius: 5,
      width: `${isWidthNotFull ? "auto" : "100%"}`,
      padding: 12,
      flex: useFlex ? 1 : 0,
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
    disabled: {
      backgroundColor: "#cdcdcd", // Grayed out color
    },
    buttonText: {
      color: "#fff",
      fontSize: fontSize || 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      disabled={isDisable}
      style={[
        styles.button,
        getButtonStyle(),
        isDisable ? styles.disabled : null,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
