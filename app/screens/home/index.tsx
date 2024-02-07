import {View, Text, StyleSheet} from "react-native";
import React from "react";
import HomeNavButtons from "../../../src/components/forms/buttons/HomeNavButtons";
import {homeRoutes} from "../../../src/routes/homeRoutes";

const HomeIndex = () => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 25,
    justifyContent: "space-evenly",
    height: "80%",
  },
});

export default HomeIndex;
