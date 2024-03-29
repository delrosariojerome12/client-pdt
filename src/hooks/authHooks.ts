import { useAppDispatch, useAppSelector } from "../store/store";
import { onLogin, onLogout, setPhpServer } from "../reducers/authReducer";
import { useState } from "react";
import { ToastMessage } from "../helper/Toast";
import { useRouter } from "expo-router";
import { useServiceHooks } from "./serviceHooks";
import { generateRandomString } from "../helper/RandomString";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  storeAsyncData,
  getAsyncData,
  removeAsyncData,
} from "../../src/helper/AsyncStorage";
import { useUserActivityLog } from "./userActivityLogHooks";
import { METHODS } from "../enums/activitylog";

export const useAuthHooks = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handlePost, handleGet, handlePatch, status } = useServiceHooks();
  const { updateAction } = useUserActivityLog();

  const [userID, setUserID] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const handleLogin = async () => {
    // if (!userID || !password) {
    //   ToastMessage("Please Fill the fields first", 1000);
    //   return;
    // }
    const randomString = await generateRandomString(32);

    const response = await handlePost({
      url: "auth/login",
      requestData: {
        usrpwd: "5436",
        usrcde: "Msumang",
      },
      toastMessage: {
        error: "Login Failed",
        loading: "Logging in...",
        success: "Login Success!",
      },
      onSuccess: (data) => {
        setTimeout(async () => {
          dispatch(onLogin({ sesidData: randomString, userData: data }));

          storeAsyncData(
            { sesidData: randomString, userData: data },
            "user-cred"
          );

          await handleGet({
            url: "lst_tracc/syspar2?_includes=tracc_progdomain,tracc_progdir",
            onSuccess: (data) => {
              dispatch(setPhpServer(data[0]));
            },
            disableToast: true,
          });
          await handlePatch({
            url: "lst_tracc/userfile",
            requestData: {
              field: {
                usrcde: "msumang",
              },
              data: {
                sesid: randomString,
              },
            },
            disableToast: true,
          });

          router.replace("screens/home/");
        }, 1500);
      },
    });

    if (response) {
      updateAction({
        method: METHODS.LOGIN,
        remarks: "User Logged In.",
        activity: "User Logged In.",
      });
    }
  };

  const handleLogout = () => {
    ToastMessage("Logging out...", 1000);
    try {
      dispatch(onLogout());
      removeAsyncData("user-cred");
      updateAction({
        method: METHODS.LOGOUT,
        remarks: "User Logged Out.",
        activity: "User Logged Out.",
      });
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsLoggedIn = async () => {
    const user = await getAsyncData("user-cred");

    if (user) {
      console.log("pasok");
      dispatch(onLogin({ sesidData: user.sesidData, userData: user.userData }));
      await handlePatch({
        url: "lst_tracc/userfile",
        requestData: {
          field: {
            usrcde: user.usrcde,
          },
          data: {
            sesid: user.sesidData,
          },
        },
        disableToast: true,
      });
      await handleGet({
        url: "lst_tracc/syspar2?_includes=tracc_progdomain,tracc_progdir",
        onSuccess: (data) => {
          dispatch(setPhpServer(data[0]));
        },
        disableToast: true,
      });
      router.push("screens/home/");
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
    checkIsLoggedIn,
  };
};
