import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

interface SwitchButtonProps {
  options: string[];
  onChange: (index: number) => void;
  activeIndex: number;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  options,
  onChange,
  activeIndex,
}) => {
  const handlePress = (index: number) => {
    onChange(index);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.button,
            index === activeIndex && styles.activeButton,
            index === 0 && styles.firstButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              index === activeIndex && styles.activeText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  firstButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
});

export default SwitchButton;
