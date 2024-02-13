import {View, Text} from "react-native";
import React from "react";

interface DocumentHeader {
  docnum: string;
  otherNo: string;
}

const DocumentHeader = (props: DocumentHeader) => {
  const {docnum, otherNo} = props;
  return (
    <View>
      <Text>{docnum}</Text>
      <Text>{otherNo}</Text>
    </View>
  );
};

export default DocumentHeader;
