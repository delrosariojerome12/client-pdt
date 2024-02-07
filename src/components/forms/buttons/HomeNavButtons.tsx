import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import {useRouter} from "expo-router";

interface HomeNav {
  title: string;
  routePath: string;
}

const HomeNavButtons = (props: HomeNav) => {
  const router = useRouter();
  const {routePath, title} = props;

  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => {
        router.navigate(routePath);
      }}
    >
      <Text style={{textAlign: "center", color: "#FFF", fontWeight: "600"}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navButton: {
    backgroundColor: "#007bff",
    padding: 20,
  },
});

export default HomeNavButtons;
