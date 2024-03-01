import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import {Table, Row, Rows} from "react-native-reanimated-table";
import {generalStyles} from "../../../styles/styles";
import {SelectProps} from "../../../hooks/documentHooks";
import {TypeSelect} from "../../../hooks/documentHooks";

interface TableProps {
  tableHeaders: string[];
  tableData: any[];
  visibleProperties: string[];
  isSelectDisable?: boolean;
  isPostDisable?: boolean;
  onSelect?: ({item, type}: SelectProps) => void;
  onPost?: (selectedItem: any) => void;
  selectType?: TypeSelect;
}

const CustomTable = (props: TableProps) => {
  const {
    tableHeaders,
    tableData,
    visibleProperties,
    isSelectDisable,
    isPostDisable,
    onSelect,
    onPost,
    selectType,
  } = props;

  const renderButtons = (rowData: any) => {
    return (
      <View style={{gap: 10}}>
        {!isSelectDisable && (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() =>
              onSelect &&
              selectType &&
              onSelect({item: rowData, type: selectType})
            }
          >
            <Text style={styles.buttonText}>SELECT</Text>
          </TouchableOpacity>
        )}

        {!isPostDisable && (
          <TouchableOpacity
            style={styles.postbutton}
            onPress={() => onPost && onPost(rowData)}
          >
            <Text style={styles.buttonText}>POST</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderDataRows = () => {
    const rowDataArray = tableData.map((rowData) => [
      ...visibleProperties.map((prop) => rowData[prop]),
      renderButtons(rowData),
    ]);

    return (
      <Rows
        data={rowDataArray}
        style={styles.rows}
        textStyle={styles.rowText}
      />
    );
  };

  const renderTable = () => {
    if (tableData.length > 0) {
      return (
        <Table borderStyle={{borderWidth: 1, borderColor: "#C1C0B9"}}>
          <Row
            data={tableHeaders}
            style={styles.row}
            textStyle={styles.headText}
          />
          {renderDataRows()}
        </Table>
      );
    }
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>No data available</Text>
      </View>
    );
  };

  return (
    <ScrollView style={generalStyles.innerContainer}>
      {renderTable()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: "#f1f8ff"},
  headText: {margin: 6, fontWeight: "bold", fontSize: 14},
  row: {height: 80, flex: 1, backgroundColor: "#ccc"},
  rows: {height: 120, flex: 1, backgroundColor: "#fff"},

  rowText: {
    padding: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  buttons: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
  },
  postbutton: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default CustomTable;
