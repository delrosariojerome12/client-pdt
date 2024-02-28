import {useAppDispatch, useAppSelector} from "../store/store";
import {useState} from "react";
import {handleUpdateProtocol} from "../reducers/authReducer";
import {ToastMessage} from "../helper/Toast";

export const useServerHooks = () => {
  const {
    server: {ipAddress, port, protocol},
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [serverConfig, setServerConfig] = useState({
    protocol: protocol,
    ipAddress: ipAddress,
    port: port,
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
