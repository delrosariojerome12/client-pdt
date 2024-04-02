import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { DataTable } from "react-native-paper";
import { PaperProvider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { formatDateStringMMDDYYYY } from "../../../helper/Date";

interface TableProps {
  tableHeaders: string[];
  tableData: any[];
  visibleProperties: string[];
  disableActions?: boolean;
  isSelectDisable?: boolean;
  isPostDisable?: boolean;
  onSelect?: (selectedItem: any) => void;
  onPost?: (selectedItem: any) => void;
  onSelectRow?: (selectedItem: any) => void; //not using action just the row
}

const ReactPaperTable = (props: TableProps) => {
  const {
    tableHeaders,
    tableData,
    visibleProperties,
    isSelectDisable,
    isPostDisable,
    onSelect,
    onPost,
    disableActions,
    onSelectRow,
  } = props;

  const numberOfItemsPerPageList = [10, 25, 50, 100];
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, tableData.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const renderButtons = (rowData: any) => {
    return (
      <View style={{ gap: 5, flexDirection: "row" }}>
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

  const tableheader = (header: string, index: number) => (
    <DataTable.Title
      style={{ width: 100, backgroundColor: "#ccc" }}
      textStyle={{ fontWeight: "bold", fontSize: 14, textAlign: "center" }}
      key={index}
    >
      {header}
    </DataTable.Title>
  );

  const tableRow = (item: any, index: number) => (
    <DataTable.Row key={index} style={{}}>
      {visibleProperties.map((prop, propIndex) => (
        <DataTable.Cell
          style={{
            width: 100,
          }}
          key={propIndex}
          onPress={() => onSelectRow && onSelectRow(item)}
        >
          {prop.includes("dte")
            ? item[prop] && formatDateStringMMDDYYYY(item[prop])
            : item[prop]}
        </DataTable.Cell>
      ))}

      {!disableActions && (
        <DataTable.Cell style={{ width: 100, justifyContent: "center" }}>
          {renderButtons(item)}
        </DataTable.Cell>
      )}
    </DataTable.Row>
  );

  return (
    <PaperProvider>
      <ScrollView>
        <DataTable style={styles.table}>
          <ScrollView
            showsHorizontalScrollIndicator
            horizontal={tableData.length === 0 ? false : true}
            contentContainerStyle={{ flexDirection: "column" }}
          >
            <DataTable.Header>
              {tableHeaders.map((header, index) => tableheader(header, index))}
              {!disableActions && (
                <DataTable.Title
                  style={{ width: 100, backgroundColor: "#ccc" }}
                  textStyle={{
                    fontWeight: "bold",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Actions
                </DataTable.Title>
              )}
            </DataTable.Header>

            {tableData.length === 0 ? (
              <View style={styles.placeholderContainer}>
                <FontAwesome name="file-o" size={50} color="#000" />
                <Text style={styles.placeholderText}>No records found</Text>
              </View>
            ) : (
              <>
                {tableData
                  .slice(
                    page * numberOfItemsPerPage,
                    page * numberOfItemsPerPage + numberOfItemsPerPage
                  )
                  .map((row, index) => tableRow(row, index))}

                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(
                    tableData.length / numberOfItemsPerPage
                  )}
                  onPageChange={(page) => setPage(page)}
                  label={`${from + 1}-${to} of ${tableData.length}`}
                  showFastPaginationControls
                  numberOfItemsPerPage={numberOfItemsPerPage}
                  numberOfItemsPerPageList={[10]}
                  onItemsPerPageChange={onItemsPerPageChange}
                  selectPageDropdownLabel={"Rows per page"}
                  style={{
                    alignSelf: "center",
                  }}
                />
              </>
            )}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  table: {
    position: "relative",
    borderRadius: 10,
    backgroundColor: "#ccc",
    borderBlockColor: "#ccc",
    // height: 650,
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReactPaperTable;
