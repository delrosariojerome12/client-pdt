import {useAppDispatch} from "../store/store";
import {useState} from "react";
import {handleUpdateProtocol} from "../reducers/authReducer";
import {ToastMessage} from "../helper/Toast";

export const useServerHooks = () => {
  const dispatch = useAppDispatch();

  const [serverConfig, setServerConfig] = useState({
    protocol: "http",
    ipAddress: "192.168.100.4",
    port: 8080,
  });

  const handleInputChange = (key: string, value: string | number) => {
    setServerConfig({...serverConfig, [key]: value});
  };

  const updateServer = () => {
    ToastMessage("Updating...", 1000);

    try {
      dispatch(handleUpdateProtocol(serverConfig));
      ToastMessage("Server Protocols Updated.", 1000);
    } catch (error) {
      ToastMessage("Failed to update.", 1000);
    }
  };

  return {
    serverConfig,
    handleInputChange,
    updateServer,
  };
};
