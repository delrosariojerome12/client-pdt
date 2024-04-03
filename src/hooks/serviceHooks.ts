import axios from "axios";
import { useState } from "react";
import { ToastMessage } from "../helper/Toast";
import { useAppSelector } from "../store/store";

interface ToastMessage {
  loading: string;
  error: string;
  success: string;
}

interface GetProps {
  url: string;
  toastMessage?: ToastMessage;
  onSuccess?: (data: any) => void;
  disableToast?: boolean;
  config?: any;
  customBaseURL?: string;
}

interface SendProps {
  url: string;
  requestData: any;
  toastMessage?: ToastMessage;
  onSuccess?: (data: any) => void; // Callback function for success
  onError?: (error: any) => void;
  disableToast?: boolean;
  config?: any;
  customBaseURL?: string;
}

export const useServiceHooks = () => {
  const {
    server: { ipAddress, port, protocol },
  } = useAppSelector((state) => state.auth);

  const baseURl = `${protocol}://${ipAddress}:${port}`;
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const [data, setData] = useState<any>(null);

  const handleGet = async ({
    url,
    disableToast,
    onSuccess,
    toastMessage,
    config,
    customBaseURL,
  }: GetProps) => {
    const completeUrl = customBaseURL
      ? `${customBaseURL}/api/${url}`
      : `${baseURl}/api/${url}`;

    console.log("daan url", completeUrl);

    setStatus("loading");

    !disableToast && ToastMessage(toastMessage?.loading || "Loading...", 1000);

    try {
      const response = await axios.get(completeUrl, config ? config : {});
      console.log("get res:", response);
      if (response) {
        setData(response.data);
        setStatus("success");
        !disableToast &&
          ToastMessage(toastMessage?.success || "Fetch Success!", 1000);

        // Invoke the onSuccess callback with response data
        onSuccess && onSuccess(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.log("url", completeUrl);
      console.log("mali", error);
      setStatus("failed");
      !disableToast &&
        ToastMessage(toastMessage?.error || "Fetch Failed!", 1000);
      throw error;
    }
  };

  const handlePost = async ({
    url,
    requestData,
    disableToast,
    onSuccess,
    onError,
    toastMessage,
    config,
    customBaseURL,
  }: SendProps) => {
    const completeUrl = customBaseURL
      ? `${customBaseURL}/api/${url}`
      : `${baseURl}/api/${url}`;
    console.log("daan url", completeUrl);

    setStatus("loading");
    if (!disableToast) {
      ToastMessage(toastMessage?.loading || "Loading...", 500);
    }

    try {
      const response = await axios.post(completeUrl, requestData, config);

      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        setStatus("success");
        !disableToast &&
          ToastMessage(toastMessage?.success || "Post Success!", 500);
        onSuccess && onSuccess(response.data);

        return response.data;
      }
      return null;
    } catch (error) {
      console.log("url", completeUrl);
      console.log("mali", error);
      onError && onError(error);
      setStatus("failed");
      !disableToast && ToastMessage(toastMessage?.error || "Post Failed!", 500);
      return null;
    }
  };

  const handlePut = async ({
    url,
    requestData,
    disableToast,
    onSuccess,
    toastMessage,
  }: SendProps) => {
    const completeUrl = `${baseURl}/api/${url}`;

    setStatus("loading");
    if (!disableToast) {
      ToastMessage(toastMessage?.loading || "Loading...", 1000);
    }

    try {
      const response = await axios.put(completeUrl, requestData);

      setData(response.data);
      setStatus("success");
      ToastMessage(toastMessage?.success || "Update Success!", 1000);

      // Invoke the onSuccess callback with response data
      onSuccess && onSuccess(response.data);

      return response.data;
    } catch (error) {
      setStatus("failed");
      ToastMessage(toastMessage?.error || "Update Failed!", 1000);
      throw error;
    }
  };

  const handlePatch = async ({
    url,
    requestData,
    disableToast,
    onSuccess,
    toastMessage,
    config,
    customBaseURL,
    onError,
  }: SendProps) => {
    const completeUrl = customBaseURL
      ? `${customBaseURL}/api/${url}`
      : `${baseURl}/api/${url}`;
    console.log("daan url", completeUrl);

    setStatus("loading");

    !disableToast && ToastMessage(toastMessage?.loading || "Loading...", 1000);

    try {
      const response = await axios.patch(completeUrl, requestData, config);
      console.log("patch res:", response);

      if (response) {
        setData(response.data);
        setStatus("success");

        !disableToast &&
          ToastMessage(toastMessage?.success || "Update Success!", 1000);

        // Invoke the onSuccess callback with response data
        onSuccess && onSuccess(response.data);
        console.log("patch sukli", response.data);

        return response.data;
      }
      return null;
    } catch (error) {
      console.log("url", completeUrl);
      console.log("mali", error);
      setStatus("failed");
      onError && onError(error);

      !disableToast &&
        ToastMessage(toastMessage?.error || "Update Failed!", 1000);
      throw error;
    }
  };

  return {
    status,
    data,
    handleGet,
    handlePost,
    handlePut,
    handlePatch,
  };
};
