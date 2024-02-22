import {View, Text} from "react-native";
import React from "react";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  //   selectedItem: any;
  //   title: string;
  //   propertiesToShow: {name: string; label: string}[];
  //   customContent: JSX.Element;
}

const SearchModal = (props: SearchModalProps) => {
  const {onClose, visible} = props;
  return (
    <View>
      <Text>SearchModal</Text>
    </View>
  );
};

export default SearchModal;
