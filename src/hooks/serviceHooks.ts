import axios from "axios";
import {useState} from "react";
import {ToastMessage} from "../helper/Toast";
import {useAppSelector} from "../store/store";

interface ToastMessage {
  loading: string;
  error: string;
  success: string;
}

export const useServiceHooks = () => {
  const {
    server: {ipAddress, port, protocol},
  } = useAppSelector((state) => state.auth);

  const baseURl = `${protocol}://${ipAddress}:${port}`;
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const [data, setData] = useState<any>(null);

  const handleGet = async (
    url: string,
    toastMessage?: ToastMessage,
    onSuccess?: (data: any) => void // Callback function for success
  ) => {
    const completeUrl = `${baseURl}/api/${url}`;
    console.log(completeUrl);

    setStatus("loading");
    ToastMessage(toastMessage?.loading || "Loading...", 1000);
    try {
      const response = await axios.get(completeUrl);

      setData(response.data);
      setStatus("success");
      ToastMessage(toastMessage?.success || "Fetch Success!", 1000);

      // Invoke the onSuccess callback with response data
      onSuccess && onSuccess(response.data);

      return response.data;
    } catch (error) {
      setStatus("failed");
      ToastMessage(toastMessage?.error || "Fetch Failed!", 1000);
      throw error;
    }
  };

  const handlePost = async (
    url: string,
    requestData: any,
    toastMessage?: ToastMessage,
    onSuccess?: (data: any) => void // Callback function for success
  ) => {
    const completeUrl = `${baseURl}/api/${url}`;
    // const completeUrl = `http://10.0.2.2:5901/api/${url}`;

    setStatus("loading");
    ToastMessage(toastMessage?.loading || "Loading...", 500);

    try {
      const response = await axios.post(completeUrl, requestData);
      console.log(response.data);

      setData(response.data);
      setStatus("success");
      ToastMessage(toastMessage?.success || "Post Success!", 500);
      onSuccess && onSuccess(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      setStatus("failed");
      ToastMessage(toastMessage?.error || "Post Failed!", 500);
    }
  };

  const handlePut = async (
    url: string,
    requestData: any,
    toastMessage?: ToastMessage,
    onSuccess?: (data: any) => void // Callback function for success
  ) => {
    const completeUrl = `${baseURl}/${url}`;

    setStatus("loading");
    ToastMessage(toastMessage?.loading || "Loading...", 1000);

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

  return {
    status,
    data,
    handleGet,
    handlePost,
    handlePut,
  };
};
