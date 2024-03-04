import React from "react";
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";

const CustomLoadingText = ({text}: {text: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default CustomLoadingText;
