import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import CustomButton from "../src/components/forms/buttons/CustomButton";
import { Link } from "expo-router";
import { useAuthHooks } from "../src/hooks/authHooks";
import CustomLoadingText from "../src/components/load-spinner/CustomLoadingText";
import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";

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

  const [showPassword, setShowPassword] = useState(false);
  const secondInputRef = useRef<any>(null);

  const focusSecondInput = () => {
    if (secondInputRef.current) {
      secondInputRef.current.focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkUserData = async () => {
      checkIsLoggedIn();
    };
    checkUserData();
  }, []);

  return (
    <View style={styles.container}>
      {status === "loading" && (
        <CustomLoadingText
          text="Logging In..."
          visible={status === "loading"}
        />
      )}
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/lst_logo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={{ alignItems: "flex-end", width: "100%" }}>
        <Text>v{Constants?.expoConfig?.version}</Text>
      </View>

      <Text style={styles.title}>Login</Text>
      {status === "failed" && <Text style={styles.error}>{statusText}</Text>}

      <TextInput
        style={styles.input}
        placeholder="USER ID"
        value={userID}
        onChangeText={(text) => setUserID(text)}
        onSubmitEditing={focusSecondInput}
      />

      <View style={styles.inputPassContainer}>
        <TextInput
          style={styles.inputPass}
          placeholder="PASSWORD"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={handleLogin}
          ref={secondInputRef}
        />
        {showPassword ? (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <FontAwesome5
              name="eye"
              size={24}
              color="black"
              style={{ position: "absolute", top: 15, right: 10 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <FontAwesome5
              name="eye-slash"
              size={24}
              color="black"
              style={{ position: "absolute", top: 15, right: 10 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.customButton}>
        <CustomButton onPress={handleLogin} title="Login" type="regular" />
      </View>

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
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 10,
  },
  image: {
    width: "100%",
  },
  inputPassContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
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
  inputPass: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 100 / 30,
  },
  toggleButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
