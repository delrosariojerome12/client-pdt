import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, {useState} from "react";
import {FontAwesome} from "@expo/vector-icons";
import {format} from "../../../styles/styles";

interface InputProps {
  label: string;
  onShow: () => void;
}

const InputWithSearch = (props: InputProps) => {
  const {label, onShow} = props;
  const [text, setText] = useState<string>("");

  return (
    <View style={style.inputWithSearchContainer}>
      {text === "" ? (
        <Text style={style.placeholder}>{label}</Text>
      ) : (
        <Text style={style.labelAboveInput}>{label}</Text>
      )}
      <View style={style.inputFieldWrapper}>
        <TextInput
          style={style.inputField} // Apply your styles for the input field
          placeholder="" // No need for placeholder when using conditional rendering
          value={text}
          onChangeText={(newText) => setText(newText)}
        />
        <TouchableOpacity onPress={onShow}>
          <FontAwesome name="search" size={20} color="#808080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputWithSearchContainer: {
    marginBottom: 20,
  },
  inputFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 5, // Adjust as needed
  },
  placeholder: {
    position: "absolute",
    left: 5,
    top: 10,
    fontSize: 16,
    color: "#808080",
  },
  labelAboveInput: {
    fontSize: 16,
    color: "#808080",
    marginBottom: 5,
  },
});

export default InputWithSearch;
