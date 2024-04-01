import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { handleUpdateProtocol } from "../reducers/authReducer";
import { ToastMessage } from "../helper/Toast";
import {
  storeAsyncData,
  getAsyncData,
  removeAsyncData,
} from "../../src/helper/AsyncStorage";
import { setStatus } from "../reducers/statusReducer";
import { Alert } from "react-native";
import { router } from "expo-router";

export const useServerHooks = () => {
  const {
    server: { ipAddress, port, protocol },
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { status, statusText } = useAppSelector((state) => state.status);

  const [serverConfig, setServerConfig] = useState({
    protocol: protocol,
    ipAddress: ipAddress,
    port: port,
  });

  const handleInputChange = (key: string, value: string | number) => {
    setServerConfig({ ...serverConfig, [key]: value });
  };

  const updateServer = () => {
    Alert.alert(
      "Server Config Saving",
      "Are you sure to use this server config? This can be change again.",
      [
        {
          text: "YES",
          onPress: () => {
            dispatch(setStatus("loading"));
            try {
              storeAsyncData(serverConfig, "server-config");
              dispatch(handleUpdateProtocol(serverConfig));
              setTimeout(() => {
                dispatch(setStatus("idle"));
                router.push("/");
                ToastMessage("Server Config Updated.", 1000);
              }, 1000);
            } catch (error) {
              ToastMessage("Failed to update.", 1000);
            }
          },
        },
        {
          text: "NO",
        },
      ]
    );
  };

  return {
    serverConfig,
    handleInputChange,
    updateServer,
    status,
    statusText,
  };
};
