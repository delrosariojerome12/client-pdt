import React from "react";
import {Picker} from "@react-native-picker/picker";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";

interface DropDown {
  title: string;
  selectedValue: string;
  onInputChange: (key: string, value: string) => void;
  inputKey: string;
  choices: {label: string; value: string}[];
}

const DropDown = (props: DropDown) => {
  const {title, selectedValue, onInputChange, inputKey, choices} = props;

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedValue}
          onValueChange={(value) => onInputChange(inputKey, value)}
        >
          {choices.map((item, index) => {
            return (
              <Picker.Item label={item.label} value={item.value} key={index} />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    // marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  dropdown: {
    height: 50,
    width: "100%",
  },
});

export default DropDown;
