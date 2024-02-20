import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

interface CustomCheckBoxProps {
  label: string;
  value: boolean;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({label, value}) => {
  const [checked, setChecked] = useState(value);

  const toggleCheckBox = () => {
    const newChecked = !checked;
    setChecked(newChecked);
  };

  return (
    <TouchableOpacity style={styles.checkBoxContainer} onPress={toggleCheckBox}>
      <View style={[styles.checkBox, checked && styles.checkedBox]} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: "#00f", // Change the background color to blue when checked
  },
});

export default CustomCheckBox;
