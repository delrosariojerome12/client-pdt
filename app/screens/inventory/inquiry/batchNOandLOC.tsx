import {View, Text, StyleSheet} from "react-native";
import React from "react";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import {format, generalStyles} from "../../../../src/styles/styles";
import ReactPaperTable from "../../../../src/components/forms/table/ReactPaperTable";
import InputWithSearch from "../../../../src/components/forms/inputs/InputWithSearch";
import {shadows} from "../../../../src/styles/styles";

const tableData: any = [];

const BatchNOandLOC = () => {
  const tableHeaders = [
    "BIN No.",
    "Item",
    "Batch No.",
    "Exp. Date",
    "Onhand",
    "Actions",
  ];
  const tableVisibleProps = [
    "binNumber",
    "itemName",
    "batchNumber",
    "expDate",
    "pieces",
  ];

  return (
    <View style={generalStyles.innerContainer}>
      <View style={styles.searchContainer}>
        <InputWithSearch label="Warehouse" onShow={() => {}} />
        <View style={{gap: 10}}>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Warehouse No.:</Text>
            <Text>111</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Storage Location:</Text>
            <Text>11</Text>
          </View>
        </View>
        <InputWithSearch label="Bin No." onShow={() => {}} />
        <InputWithSearch label="Item" onShow={() => {}} />
      </View>

      <ReactPaperTable
        tableHeaders={tableHeaders}
        tableData={tableData}
        visibleProperties={tableVisibleProps}
        isPostDisable={true}
        onSelect={(item) => {
          console.log(item);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    borderWidth: 1,
    gap: 5,
  },
});

export default BatchNOandLOC;
