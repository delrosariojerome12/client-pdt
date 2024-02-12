import {StyleSheet} from "react-native";

export const generalStyles = StyleSheet.create({
  // containers
  wideContainer: {
    gap: 10,
    padding: 25,
    justifyContent: "space-evenly",
    height: "100%",
  },
  container: {
    flex: 1,
    gap: 25,
    padding: 25,
  },
  innerContainer: {
    padding: 7,
    paddingTop: 20,
    flex: 1,
    gap: 20,
  },

  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  regularText: {
    fontSize: 16,
  },
  colorWhite: {
    color: "#fff",
  },
  colorBlack: {
    color: "#000",
  },
});
