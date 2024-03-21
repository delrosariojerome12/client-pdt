import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Table, Row, Rows } from "react-native-reanimated-table";
import { generalStyles } from "../../../styles/styles";
import { SelectProps, PostProps } from "../../../hooks/documentHooks";
import { TypeSelect, TypePost, ButtonUses } from "../../../hooks/documentHooks";
import { formatDateStringMMDDYYYY } from "../../../helper/Date";

interface TableProps {
  tableHeaders: string[];
  tableData: any[];
  visibleProperties: string[];
  isSelectDisable?: boolean;
  isPostDisable?: boolean;
  onSelect?: ({ item, type }: SelectProps) => void;
  onSelectRow?: (selectedItem: any) => void; //not using action just the row
  onPost?: ({ item, type }: PostProps) => void;
  onBatchSelect?: (batchItem: any) => void;
  selectType?: TypeSelect;
  postType?: TypePost;
  buttonUses: ButtonUses;
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
    onBatchSelect,
    onSelectRow,
    selectType,
    postType,
    buttonUses,
  } = props;

  const correctButtonStatus = (rowData: any, buttonType: "post" | "select") => {
    switch (buttonUses) {
      case "pto":
        switch (buttonType) {
          case "post":
            return rowData.posted ? true : false;
          case "select":
            return rowData.validated ? true : false;
        }
      case "pur":
        if (rowData.for_posting === false) {
          return true;
        }
        return false;
      case "whs":
        if (rowData.for_posting === false) {
          return true;
        }
        return;
      case "srto":
        if (rowData.for_posting === true) {
          return true;
        }
        return false;
      default:
        break;
    }
  };

  const renderButtons = (rowData: any) => {
    return (
      <View style={{ gap: 10, paddingHorizontal: 10 }}>
        {onSelectRow && (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              onSelectRow(rowData);
            }}
          >
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        )}

        {onBatchSelect && (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              onBatchSelect(rowData);
            }}
          >
            <Text style={styles.buttonText}>Batch Select</Text>
          </TouchableOpacity>
        )}

        {!isSelectDisable && (
          <TouchableOpacity
            style={[
              styles.buttons,
              correctButtonStatus(rowData, "select")
                ? { opacity: 0.7, backgroundColor: "gray" }
                : {},
            ]}
            disabled={correctButtonStatus(rowData, "select")}
            onPress={() =>
              onSelect &&
              selectType &&
              onSelect({ item: rowData, type: selectType })
            }
          >
            <Text style={styles.buttonText}>SELECT</Text>
          </TouchableOpacity>
        )}

        {!isPostDisable && (
          <TouchableOpacity
            style={[
              styles.postbutton,
              correctButtonStatus(rowData, "post")
                ? { opacity: 0.7, backgroundColor: "gray" }
                : {},
            ]}
            disabled={correctButtonStatus(rowData, "post")}
            onPress={() =>
              onPost && postType && onPost({ item: rowData, type: postType })
            }
          >
            <Text style={styles.buttonText}>POST</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // const renderDataRows = () => {
  //   const rowDataArray = tableData.map((rowData) => [
  //     ...visibleProperties.map((prop) => rowData[prop]),
  //     renderButtons(rowData),
  //   ]);

  //   return (
  //     <Rows
  //       data={rowDataArray}
  //       style={styles.rows}
  //       textStyle={styles.rowText}
  //     />
  //   );
  // };

  const renderDataRows = () => {
    const rowDataArray = tableData.map((rowData) => {
      const formattedRowData = visibleProperties.map((prop) => {
        if (prop.includes("dte") && rowData[prop]) {
          return formatDateStringMMDDYYYY(rowData[prop]);
        }
        return rowData[prop];
      });

      return [...formattedRowData, renderButtons(rowData)];
    });

    return (
      <Rows
        data={rowDataArray}
        style={styles.rows}
        textStyle={styles.rowText}
      />
    );
  };

  const renderTable = () => {
    if (tableData) {
      if (tableData.length > 0) {
        return (
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHeaders}
              style={styles.row}
              textStyle={styles.headText}
            />
            {renderDataRows()}
          </Table>
        );
      }
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
  head: { height: 40, backgroundColor: "#f1f8ff" },
  headText: { margin: 6, fontWeight: "bold", fontSize: 14 },
  row: { height: 80, flex: 1, backgroundColor: "#ccc" },
  rows: { height: 120, flex: 1, backgroundColor: "#fff" },

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
