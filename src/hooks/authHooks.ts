import {useAppDispatch, useAppSelector} from "../store/store";
import {onLogin, onLogout} from "../reducers/authReducer";
import {useState} from "react";
import {ToastMessage} from "../helper/Toast";
import {useRouter} from "expo-router";
import {useServiceHooks} from "./serviceHooks";

export const useAuthHooks = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {handlePost, status, data} = useServiceHooks();

  const [userID, setUserID] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const handleLogin = async () => {
    // if (!userID || !password) {
    //   ToastMessage("Please Fill the fields first", 1000);
    //   return;
    // }
    await handlePost(
      "auth/login",
      {
        usrpwd: "5436",
        usrcde: "Msumang",
      },
      // {
      //   usrpwd: password,
      //   usrcde: userID,
      // },
      {
        error: "Login Failed",
        loading: "Logging in...",
        success: "Login Success",
      },
      (data) => {
        console.log(data);
        setTimeout(() => {
          dispatch(onLogin(data));
          router.replace("screens/home/");
        }, 1500);
      }
    );
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
