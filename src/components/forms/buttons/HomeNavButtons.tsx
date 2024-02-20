import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import {useAppSelector, useAppDispatch} from "../../../store/store";
import {handlePreviousRoute} from "../../../reducers/routerReducer";
import {handleClearDocument} from "../../../reducers/documentReducer";
interface HomeNav {
  title: string;
  routePath: string;
}

const HomeNavButtons = (props: HomeNav) => {
  const {previousRoutes} = useAppSelector((state) => state.router);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {routePath, title} = props;

  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => {
        router.push(routePath);
        const parentPath = routePath.substring(0, routePath.lastIndexOf("/"));
        dispatch(handlePreviousRoute(parentPath));
        dispatch(handleClearDocument());
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
    padding: 30,
    borderRadius: 100 / 25,
  },
});

export default HomeNavButtons;
