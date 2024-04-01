import { useAppDispatch, useAppSelector } from "../store/store";
import { onLogin, onLogout, setPhpServer } from "../reducers/authReducer";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useServiceHooks } from "./serviceHooks";
import { generateRandomString } from "../helper/RandomString";
import {
  storeAsyncData,
  getAsyncData,
  removeAsyncData,
} from "../../src/helper/AsyncStorage";
import { useUserActivityLog } from "./userActivityLogHooks";
import { METHODS } from "../enums/activitylog";
import { setStatus, setStatusText } from "../reducers/statusReducer";

export const useAuthHooks = () => {
  const { status, statusText } = useAppSelector((state) => state.status);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handlePost, handleGet, handlePatch } = useServiceHooks();
  const { updateAction } = useUserActivityLog();

  const [userID, setUserID] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const handleLogin = async () => {
    // if (!userID || !password) {
    //   ToastMessage("Please Fill the fields first", 1000);
    //   return;
    // }
    dispatch(setStatus("loading"));

    if (userID === "lstv" && password === "lstventures") {
      router.replace("screens/server");

      // setTimeout(() => {
      // router.replace("/");
      // }, 1500);
    }
    const randomString = await generateRandomString(32);

    const response = await handlePost({
      url: "auth/login",
      requestData: {
        usrpwd: "5436",
        usrcde: "Msumang",
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
          dispatch(setStatus("idle"));
          router.replace("screens/home/");
        }, 1500);
      },
      onError: (error) => {
        console.log("error log in", error.response.data.message);

        setTimeout(() => {
          dispatch(
            setStatusText(
              error.response.data.message || "Cannot Connect to Server."
            )
          );
          dispatch(setStatus("failed"));
        }, 1500);
      },
      disableToast: true,
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
    dispatch(setStatus("loading"));
    try {
      removeAsyncData("user-cred");
      updateAction({
        method: METHODS.LOGOUT,
        remarks: "User Logged Out.",
        activity: "User Logged Out.",
      });
      setTimeout(() => {
        router.replace("/");
        dispatch(onLogout());
        dispatch(setStatus("idle"));
      }, 1500);
    } catch (error) {
      dispatch(setStatus("failed"));
      console.log(error);
    }
  };

  const checkIsLoggedIn = async () => {
    const user = await getAsyncData("user-cred");
    if (user) {
      console.log("pasok");
      try {
        dispatch(setStatus("loading"));
        dispatch(
          onLogin({ sesidData: user.sesidData, userData: user.userData })
        );
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
        dispatch(setStatus("idle"));

        router.push("screens/home/");
      } catch (error: any) {
        console.log(error);
        dispatch(
          setStatusText(
            error.response.data.message || "Cannot Connect to Server."
          )
        );
        dispatch(setStatus("failed"));
      }
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
    statusText,
    checkIsLoggedIn,
  };
};
