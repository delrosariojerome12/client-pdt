import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {useAppSelector} from "../../store/store";
import PTOItems from "./PTOItems";

const PTOItemsList = () => {
  const {selectedDocument} = useAppSelector((state) => state.document);

  console.log(selectedDocument);

  if (selectedDocument) {
    return (
      <View style={styles.container}>
        {selectedDocument.items.map((item: any, index: number) => {
          return <PTOItems item={item} key={index} />;
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10,
  },
});

export default PTOItemsList;
