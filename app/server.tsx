import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import CustomInputs from "../src/components/forms/inputs/CustomInputs";
import CustomButton from "../src/components/forms/buttons/CustomButton";
import DropDown from "../src/components/forms/dropdowns/DropDown";
import {useServerHooks} from "../src/hooks/serverHook";

const Server = () => {
  const {updateServer, serverConfig, handleInputChange} = useServerHooks();

  // const [serverConfig, setServerConfig] = useState({
  //   protocol: "http",
  //   ipAddress: "192.168.100.4",
  //   port: 8080,
  // });

  // const handleInputChange = (key: string, value: string | number) => {
  //   setServerConfig({...serverConfig, [key]: value});
  // };

  return (
    <View style={styles.container}>
      <DropDown
        inputKey="protocol"
        onInputChange={handleInputChange}
        title="Protocol:"
        selectedValue={serverConfig.protocol}
        choices={[
          {label: "HTTP", value: "http"},
          {label: "HTTPS", value: "https"},
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

      <View style={{marginTop: 20}}>
        <CustomButton onPress={updateServer} title="Save" type="save" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: "#f8f8f8",
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
