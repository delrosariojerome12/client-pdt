import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Linking,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../src/components/forms/buttons/CustomButton";
import { Link } from "expo-router";
import { useAuthHooks } from "../src/hooks/authHooks";
import CustomLoadingText from "../src/components/load-spinner/CustomLoadingText";

const Index = () => {
  const {
    checkIsLoggedIn,
    handleLogin,
    userID,
    setUserID,
    password,
    setPassword,
    status,
    statusText,
  } = useAuthHooks();

  // const handleLinkPress = () => {
  //   const url = "https://your-license-agreement-url.com"; // Replace with your actual URL
  //   Linking.openURL(url);
  // };

  useEffect(() => {
    const checkUserData = async () => {
      checkIsLoggedIn();
    };
    checkUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      {status === "failed" && <Text style={styles.error}>{statusText}</Text>}

      {status === "loading" && (
        <CustomLoadingText
          text="Logging In..."
          visible={status === "loading"}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="USER ID"
        value={userID}
        onChangeText={(text) => setUserID(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.customButton}>
        <CustomButton
          onPress={handleLogin}
          // title={status === "loading" ? "Logging in..." : "Login"}
          title="Login"
          type="regular"
          // isDisable={
          //   status === "loading" || status === "success" ? true : false
          // }
        />
      </View>

      {/* <Link href={"server"} style={styles.serverLink} asChild>
        <Text>Setup Server</Text>
      </Link> */}

      <View style={styles.licenseTextContainer}>
        <Text style={styles.licenseText}>
          By using this program you agree to the terms and conditions of the{" "}
          <Link href={"license"} asChild>
            <Text style={styles.licenseTextLink}>license agreement.</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 100 / 30,
  },
  error: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    padding: 10,
    backgroundColor: "#eee",
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },

  customButton: {
    width: "90%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  licenseTextContainer: {
    marginTop: 50,
  },
  licenseText: {
    fontWeight: "500",
    fontSize: 16,
  },
  licenseTextLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  serverLink: {
    marginLeft: "auto",
    padding: 15,
    marginRight: 15,
    textDecorationLine: "underline",
    color: "#28a745",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Index;
