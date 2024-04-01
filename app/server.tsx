import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import CustomInputs from "../src/components/forms/inputs/CustomInputs";
import CustomButton from "../src/components/forms/buttons/CustomButton";
import DropDown from "../src/components/forms/dropdowns/DropDown";
import { useServerHooks } from "../src/hooks/serverHook";
import CustomLoadingText from "../src/components/load-spinner/CustomLoadingText";

const Server = () => {
  const { updateServer, serverConfig, handleInputChange, status, statusText } =
    useServerHooks();

  return (
    <View style={styles.container}>
      {status === "loading" && (
        <CustomLoadingText text="Updating..." visible={status === "loading"} />
      )}
      <DropDown
        inputKey="protocol"
        onInputChange={handleInputChange}
        title="Protocol:"
        selectedValue={serverConfig.protocol}
        choices={[
          { label: "HTTP", value: "http" },
          { label: "HTTPS", value: "https" },
        ]}
      />

      <CustomInputs
        inputKey="ipAddress"
        placeHolder="IP Address"
        inputValue={serverConfig.ipAddress}
        onInputChange={handleInputChange}
        type="text"
      />

      <CustomInputs
        inputKey="port"
        placeHolder="Port"
        inputValue={serverConfig.port}
        onInputChange={handleInputChange}
        type="numeric"
      />

      <CustomButton onPress={updateServer} title="Save" type="save" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: "#f8f8f8",
    gap: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Server;
