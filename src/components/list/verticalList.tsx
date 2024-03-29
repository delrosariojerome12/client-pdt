// import React, {useState} from "react";
// import {View, Text, FlatList, RefreshControl} from "react-native";
// import VerticalItem from "./item/verticalItem";
// import {TypeSelect} from "../../hooks/documentHooks";
// import {SelectProps} from "../../hooks/documentHooks";
// import {Feather} from "@expo/vector-icons"; // Import Feather icon from expo/vector-icons

// interface VerticalListProps {
//   data: any[];
//   propertiesToShow: {name: string; label: string}[]; // Array of property names and labels
//   onSelect?: ({item, type}: SelectProps) => void;
//   onValidate: (item: any) => void;
//   refreshing: boolean; // Flag to indicate whether the list is refreshing
//   onRefresh: () => void; // Function to handle refresh action
//   onEndReached: () => void; // Function to handle pagination when reaching the end of the list
//   selectType?: TypeSelect;
// }

// const VerticalList = React.memo((props: VerticalListProps) => {
//   const {
//     data,
//     propertiesToShow,
//     onSelect,
//     onValidate,
//     refreshing,
//     onRefresh,
//     onEndReached,
//     selectType,
//   } = props;

//   const renderItem = ({item}: {item: any}) => {
//     const filteredItem = propertiesToShow.reduce((obj: any, {name}) => {
//       obj[name] = item[name];
//       return obj;
//     }, {});

//     return (
//       <VerticalItem
//         item={filteredItem}
//         propertyLabels={propertiesToShow} // Pass propertiesToShow to VerticalItem
//         onValidate={() => onValidate(item)}
//         onSelect={() => {
//           onSelect && selectType && onSelect({item: item, type: selectType});
//         }}
//       />
//     );
//   };
//   const renderEmptyList = () => {
//     return (
//       <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
//         <Feather name="alert-circle" size={30} color="black" />
//         <Text style={{marginTop: 10, fontSize: 18, fontWeight: "bold"}}>
//           No data available
//         </Text>
//       </View>
//     );
//   };
//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       ListEmptyComponent={renderEmptyList}
//       keyExtractor={(item, index) => index.toString()}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       onEndReached={onEndReached} // Add onEndReached prop
//       onEndReachedThreshold={0.4} // Specify threshold for triggering onEndReached
//       style={{marginBottom: 10}}
//     />
//   );
// });

// export default VerticalList;

import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import VerticalItem from "./item/verticalItem";
import { TypeSelect } from "../../hooks/documentHooks";
import { SelectProps } from "../../hooks/documentHooks";
import { Feather } from "@expo/vector-icons"; // Import Feather icon from expo/vector-icons

interface VerticalListProps {
  data: any[];
  propertiesToShow: { name: string; label: string }[]; // Array of property names and labels
  onSelect?: ({ item, type }: SelectProps) => void;
  onValidate: (item: any) => void;
  selectType?: TypeSelect;
  loadingStatus?: boolean;
}

const VerticalList = React.memo((props: VerticalListProps) => {
  const {
    data,
    propertiesToShow,
    onSelect,
    onValidate,
    selectType,
    loadingStatus,
  } = props;

  const renderEmptyList = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Feather name="alert-circle" size={30} color="black" />
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
          No data available
        </Text>
      </View>
    );
  };

  if (loadingStatus) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {data.length === 0
        ? renderEmptyList()
        : data.map((item, index) => {
            const filteredItem = propertiesToShow.reduce(
              (obj: any, { name }) => {
                obj[name] = item[name];
                return obj;
              },
              {}
            );

            return (
              <VerticalItem
                key={index}
                item={filteredItem}
                propertyLabels={propertiesToShow} // Pass propertiesToShow to VerticalItem
                onValidate={() => onValidate(item)}
                onSelect={() => {
                  onSelect &&
                    selectType &&
                    onSelect({ item: item, type: selectType });
                }}
              />
            );
          })}
    </View>
  );
});

export default VerticalList;
