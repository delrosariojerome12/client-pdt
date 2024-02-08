import {View} from "react-native";
import React from "react";
import HomeNavButtons from "../../../src/components/forms/buttons/HomeNavButtons";
import {homeRoutes} from "../../../src/routes/homeRoutes";
import {generalStyles} from "../../../src/styles/styles";

const HomeIndex = () => {
  return (
    <View style={generalStyles.wideContainer}>
      {homeRoutes.map((item, index) => {
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
