import { StyleSheet } from "react-native";

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
    // padding: 7,
    // paddingTop: 10,
    flex: 1,
    gap: 15,
  },
  outerContainer: {
    padding: 10,
    paddingTop: 10,
    flex: 1,
    gap: 10,
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
    borderRadius: 10,
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

export const format = StyleSheet.create({
  twoRowText: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  twoRowTextBetween: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  twoItemsRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rowBoxType: {
    flexDirection: "row",
    gap: 20,
    padding: 20,
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export const textFormat = StyleSheet.create({
  boldBigText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
