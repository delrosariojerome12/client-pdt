import React from "react";
import {View, Text, FlatList} from "react-native";
import VerticalItem from "./item/verticalItem";

interface VerticalListProps {
  data: any[];
  propertiesToShow: {name: string; label: string}[]; // Array of property names and labels
}

const VerticalList = (props: VerticalListProps) => {
  const {data, propertiesToShow} = props;
  const renderItem = ({item}: {item: any}) => {
    const filteredItem = propertiesToShow.reduce((obj: any, {name}) => {
      obj[name] = item[name];
      return obj;
    }, {});

    return (
      <VerticalItem
        item={filteredItem}
        propertyLabels={propertiesToShow} // Pass propertiesToShow to VerticalItem
        onSelect={() => console.log()}
        onValidate={() => console.log()}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default VerticalList;
