import axios from "axios";
import {useAppDispatch, useAppSelector} from "../store/store";
import {onLogin, onLogout} from "../reducers/authReducer";
import {useState} from "react";
import {ToastMessage} from "../helper/Toast";
import {useRouter} from "expo-router";

export const useAuthHooks = () => {
  const {
    server: {ipAddress, protocol, port},
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const url = `${protocol}://${ipAddress}:${port}`;

  const [userID, setUserID] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");

  const handleLogin = async () => {
    setStatus("loading");
    try {
      //   const response = axios.post(url, {userID, password});
      dispatch(onLogin());
      setStatus("success");
      ToastMessage("Login Success.", 1000);
      setTimeout(() => {
        router.replace("screens/home/");
      }, 1500);
    } catch (error) {
      setStatus("failed");
      ToastMessage("Login Failed.", 1000);
      console.log(error);
    }
  };
  const handleLogout = () => {
    ToastMessage("Logging out...", 1000);

    try {
      dispatch(onLogout());
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleLogin,
    handleLogout,
    setPassword,
    setUserID,
    password,
    userID,
    status,
  };
};
