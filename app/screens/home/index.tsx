import {View, StatusBar} from "react-native";
import React, {useEffect} from "react";
import HomeNavButtons from "../../../src/components/forms/buttons/HomeNavButtons";
import {homeRoutes} from "../../../src/routes/homeRoutes";
import {generalStyles} from "../../../src/styles/styles";

const HomeIndex = () => {
  console.log("home");

  return (
    <View style={generalStyles.wideContainer}>
      {/* <StatusBar hidden /> */}
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
