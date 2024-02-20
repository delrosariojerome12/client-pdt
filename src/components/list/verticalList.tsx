import React from "react";
import {View, Text, FlatList} from "react-native";
import VerticalItem from "./item/verticalItem";

interface VerticalListProps {
  data: any[];
  propertiesToShow: {name: string; label: string}[]; // Array of property names and labels
  onSelect: (item: any) => void;
  onValidate: (item: any) => void;
}

const VerticalList = (props: VerticalListProps) => {
  const {data, propertiesToShow, onSelect, onValidate} = props;

  const renderItem = ({item}: {item: any}) => {
    const filteredItem = propertiesToShow.reduce((obj: any, {name}) => {
      obj[name] = item[name];
      return obj;
    }, {});

    return (
      <VerticalItem
        item={filteredItem}
        propertyLabels={propertiesToShow} // Pass propertiesToShow to VerticalItem
        onSelect={() => onSelect(item)}
        onValidate={() => onValidate(item)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default VerticalList;
