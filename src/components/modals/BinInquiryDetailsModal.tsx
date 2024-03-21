import React from "react";
import { StyleSheet, View } from "react-native";
import ReactPaperTable from "../forms/table/ReactPaperTable";

interface Props {
  data: any;
}

const tableHeaders = [
  "Date",
  "Doc. No.",
  "UOM",
  "Beg. Bal.",
  "IN/OUT",
  "End Bal.",
];
const tableVisibleProps = [
  "trndte",
  "docnum",
  "untmea",
  "stkbeg",
  "stkinout",
  "stkend",
];

const BinInquiryList = React.memo((props: Props) => {
  const { data } = props;
  if (data) {
    return (
      <View style={styles.container}>
        <ReactPaperTable
          tableHeaders={tableHeaders}
          tableData={data}
          visibleProperties={tableVisibleProps}
          disableActions={true}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
});

export default BinInquiryList;
