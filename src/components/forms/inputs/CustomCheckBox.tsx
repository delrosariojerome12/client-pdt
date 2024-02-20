import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {CheckBox} from "@rneui/themed";

interface CustomCheckBoxProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  label,
  isChecked,
  onToggle,
}) => {
  return (
    <CheckBox
      center
      title={label}
      checked={isChecked}
      onPress={onToggle}
      textStyle={{fontSize: 12}}
      containerStyle={{padding: 5}}
    />
  );
};

export default CustomCheckBox;
