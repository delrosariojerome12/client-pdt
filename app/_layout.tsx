import React from "react";
import {Stack} from "expo-router";
import {Provider} from "react-redux";
import store from "../src/store/store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack initialRouteName="">
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="screens" options={{headerShown: false}} />
        <Stack.Screen name="server" options={{title: "Server Setup"}} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
