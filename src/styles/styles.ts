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

export const shadows = StyleSheet.create({
  boxShadow: {
    borderRadius: 50 / 10,
    shadowColor: "#474C5C", // Shadow color
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5, // For Android shadow
  },

  boxShadowBottom: {
    shadowColor: "#474C5C", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
});

export const bgColors = StyleSheet.create({
  grayishBG: {
    backgroundColor: "#474C5C",
  },
  mediumGrayishBG: {
    backgroundColor: "#E9EBF8",
  },
});
