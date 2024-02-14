import React from "react";
import {Stack} from "expo-router";

const ScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{headerShown: false}} />
      <Stack.Screen name="about" options={{headerShown: false}} />
    </Stack>
  );
};

export default ScreenLayout;
