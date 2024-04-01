import { View, StatusBar } from "react-native";
import React, { useEffect } from "react";
import HomeNavButtons from "../../../src/components/forms/buttons/HomeNavButtons";
import { homeRoutes } from "../../../src/routes/homeRoutes";
import { generalStyles } from "../../../src/styles/styles";
import CustomLoadingText from "../../../src/components/load-spinner/CustomLoadingText";
import { useAppSelector } from "../../../src/store/store";

const HomeIndex = () => {
  const { status } = useAppSelector((state) => state.status);
  console.log("home");
  return (
    <View style={generalStyles.wideContainer}>
      {/* <StatusBar hidden /> */}
      {status === "loading" && (
        <CustomLoadingText
          text="Logging Out..."
          visible={status === "loading"}
        />
      )}
      {homeRoutes
        .filter((item) => item.title !== "HOME")
        .map((item, index) => {
          return (
            <HomeNavButtons
              key={index}
              title={item.title}
              routePath={item.routePath}
            />
          );
        })}
    </View>
  );
};

export default HomeIndex;
