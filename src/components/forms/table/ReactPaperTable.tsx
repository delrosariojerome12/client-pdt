import React, {useState} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import {DataTable} from "react-native-paper";
import {generalStyles} from "../../../styles/styles";
import {shadows} from "../../../styles/styles";

interface TableProps {
  tableHeaders: string[];
  tableData: any[];
  visibleProperties: string[];
  isSelectDisable?: boolean;
  isPostDisable?: boolean;
  onSelect?: (selectedItem: any) => void;
  onPost?: (selectedItem: any) => void;
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
  } = props;

  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 5; // Number of items to display per page

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const renderButtons = (rowData: any) => {
    return (
      <View style={{flexDirection: "row", gap: 10}}>
        {!isSelectDisable && (
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => onSelect && onSelect(rowData)}
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
    return currentItems.map((rowData, index) => (
      <DataTable.Row key={index}>
        {visibleProperties.map((prop, propIndex) => (
          <DataTable.Cell key={propIndex}>{rowData[prop]}</DataTable.Cell>
        ))}
        <DataTable.Cell>{renderButtons(rowData)}</DataTable.Cell>
      </DataTable.Row>
    ));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderTable = () => {
    if (tableData.length > 0) {
      return (
        <ScrollView showsHorizontalScrollIndicator horizontal>
          <DataTable style={[styles.table, shadows.boxShadow]}>
            <DataTable.Header>
              {tableHeaders.map((header, index) => (
                <DataTable.Title key={index}>{header}</DataTable.Title>
              ))}
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>
            {renderDataRows()}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
              onPageChange={handlePageChange}
              label={`${indexOfFirstItem + 1}-${indexOfLastItem} of ${
                tableData.length
              }`}
              numberOfItemsPerPage={itemsPerPage}
              showFastPaginationControls
            />
          </DataTable>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
            onPageChange={handlePageChange}
            label={`${indexOfFirstItem + 1}-${indexOfLastItem} of ${
              tableData.length
            }`}
            numberOfItemsPerPage={itemsPerPage}
            showFastPaginationControls
            //   style={styles.pagination}
          />
        </ScrollView>
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
  table: {
    borderRadius: 10,
    padding: 10,
    // backgroundColor: "#333", // Darker background color
  },
  buttons: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  postbutton: {
    backgroundColor: "#FF9500",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
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
    fontWeight: "bold",
  },
  pagination: {
    alignSelf: "center", // Align pagination component to the center
    backgroundColor: "red",
  },
});

export default CustomTable;
