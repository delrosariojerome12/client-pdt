import { useAppDispatch, useAppSelector } from "../store/store";
import {
  handleUpdateProtocol,
  onLogin,
  onLogout,
  setPhpServer,
} from "../reducers/authReducer";
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
import { getCompany } from "../store/actions/generalActions";

export const useAuthHooks = () => {
  const { status, statusText } = useAppSelector((state) => state.status);
  const { server } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handlePost, handleGet, handlePatch } = useServiceHooks();
  const { updateAction } = useUserActivityLog();

  const [userID, setUserID] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const handleLogin = async () => {
    if (userID === "LSTV" && password === "Lstventures") {
      router.push("server");
      setUserID("");
      setPassword("");
      return;
    } else {
      dispatch(setStatus("loading"));
      const randomString = await generateRandomString(32);

      await handlePost({
        url: "auth/login",
        requestData: {
          // usrcde: "Msumang",
          // usrpwd: "5436",
          usrcde: userID,
          usrpwd: password,
        },
        onSuccess: (data) => {
          console.log("wat", data);
          dispatch(onLogin({ sesidData: randomString, userData: data }));

          setTimeout(async () => {
            console.log("success");

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
              config: {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
              },
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
              config: {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
              },
            });

            updateAction(
              {
                method: METHODS.LOGIN,
                remarks: "User Logged In.",
                activity: "User Logged In.",
              },
              { token: data.token, usrcde: data.usrcde, usrname: data.usrname }
            );

            dispatch(setStatus("idle"));
            router.replace("screens/home/");
          }, 1500);
        },
        onError: (error) => {
          setTimeout(() => {
            dispatch(
              setStatusText(
                error?.response?.data?.message || "Cannot Connect to Server."
              )
            );
            dispatch(setStatus("failed"));
          }, 1500);
        },
        disableToast: true,
      });
    }
  };

  const handleLogout = () => {
    dispatch(setStatus("loading"));
    try {
      removeAsyncData("user-cred");
      // removeAsyncData("server-config");

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
    const server = await getAsyncData("server-config");
    console.log("existing server", server);
    console.log("existing user", user);

    if (!server) {
      router.replace("server");
    }

    if (user) {
      try {
        dispatch(setStatus("loading"));
        dispatch(
          onLogin({ sesidData: user.sesidData, userData: user.userData })
        );

        await handlePatch({
          url: "lst_tracc/userfile",
          requestData: {
            field: {
              usrcde: user.userData.usrcde,
            },
            data: {
              sesid: user.sesidData,
            },
          },
          disableToast: true,
          config: {
            headers: {
              Authorization: `Bearer ${user.userData.token}`,
            },
          },
        });

        await handleGet({
          url: "lst_tracc/syspar2?_includes=tracc_progdomain,tracc_progdir",
          onSuccess: (data) => {
            dispatch(setPhpServer(data[0]));
          },
          disableToast: true,
          config: {
            headers: {
              Authorization: `Bearer ${user.userData.token}`,
            },
          },
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
    if (server) {
      dispatch(handleUpdateProtocol(server));
      dispatch(
        getCompany({
          limit: 1,
          offset: 0,
          config: {
            headers: {
              Authorization: `Bearer ${user.userData.token}`,
            },
          },
        })
      );
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
    server,
  };
};
