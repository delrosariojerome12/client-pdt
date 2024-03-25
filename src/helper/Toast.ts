import { ToastAndroid } from "react-native";

export const ToastMessage = (message: string, speed: number) => {
  ToastAndroid.showWithGravity(message, speed, ToastAndroid.CENTER);
};
