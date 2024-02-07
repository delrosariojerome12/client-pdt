import {View, TextInput, StyleSheet} from "react-native";
import React from "react";

interface CustomInputsProps {
  onInputChange: (key: string, value: number | string) => void;
  type: "text" | "numeric";
  inputValue: number | string;
  placeHolder: string;
  inputKey: string;
}

const CustomInputs = (props: CustomInputsProps) => {
  const {onInputChange, type, inputValue, placeHolder, inputKey} = props;

  const handleChange = (value: string) => {
    if (type === "numeric") {
      const numericValue = value === "" ? 0 : parseFloat(value);
      if (!isNaN(numericValue)) {
        onInputChange(inputKey, numericValue);
      } else {
        onInputChange(inputKey, 0);
      }
    } else {
      onInputChange(inputKey, value);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={inputValue.toString()}
        onChangeText={handleChange}
        keyboardType={type === "numeric" ? "numeric" : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 15,
    borderRadius: 100 / 30,
  },
});

export default CustomInputs;
