import {View, Text} from "react-native";
import React from "react";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import {generalStyles} from "../../../../src/styles/styles";
import ReactPaperTable from "../../../../src/components/forms/table/ReactPaperTable";
const tableData = [
  {
    binNumber: "BIN-123",
    itemCode: "ABC123",
    itemName: "Item 1",
    pieces: 5,
    receiveQty: 5,
    LPNNumber: "LPN123",
    batchNumber: "BATCH001",
    mfgDate: "2023-01-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-123",
    itemCode: "DEF456",
    itemName: "Item 2",
    pieces: 10,
    receiveQty: 10,
    LPNNumber: "LPN456",
    batchNumber: "BATCH002",
    mfgDate: "2023-02-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-123",
    itemCode: "GHI789",
    itemName: "Item 3",
    pieces: 15,
    receiveQty: 15,
    LPNNumber: "LPN789",
    batchNumber: "BATCH003",
    mfgDate: "2023-03-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-124",
    itemCode: "JKL012",
    itemName: "Item 4",
    pieces: 20,
    receiveQty: 20,
    LPNNumber: "LPN012",
    batchNumber: "BATCH004",
    mfgDate: "2023-04-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-124",
    itemCode: "MNO345",
    itemName: "Item 5",
    pieces: 25,
    receiveQty: 25,
    LPNNumber: "LPN345",
    batchNumber: "BATCH005",
    mfgDate: "2023-05-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-124",
    itemCode: "PQR678",
    itemName: "Item 6",
    pieces: 30,
    receiveQty: 30,
    LPNNumber: "LPN678",
    batchNumber: "BATCH006",
    mfgDate: "2023-06-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-125",
    itemCode: "STU901",
    itemName: "Item 7",
    pieces: 35,
    receiveQty: 35,
    LPNNumber: "LPN901",
    batchNumber: "BATCH007",
    mfgDate: "2023-07-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-125",
    itemCode: "VWX234",
    itemName: "Item 8",
    pieces: 40,
    receiveQty: 40,
    LPNNumber: "LPN234",
    batchNumber: "BATCH008",
    mfgDate: "2023-08-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-125",
    itemCode: "YZA567",
    itemName: "Item 9",
    pieces: 45,
    receiveQty: 45,
    LPNNumber: "LPN567",
    batchNumber: "BATCH009",
    mfgDate: "2023-09-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-126",
    itemCode: "BCD890",
    itemName: "Item 10",
    pieces: 50,
    receiveQty: 50,
    LPNNumber: "LPN890",
    batchNumber: "BATCH010",
    mfgDate: "2023-10-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-126",
    itemCode: "EFG123",
    itemName: "Item 11",
    pieces: 55,
    receiveQty: 55,
    LPNNumber: "LPN123",
    batchNumber: "BATCH011",
    mfgDate: "2023-11-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-126",
    itemCode: "HIJ456",
    itemName: "Item 12",
    pieces: 60,
    receiveQty: 60,
    LPNNumber: "LPN456",
    batchNumber: "BATCH012",
    mfgDate: "2023-12-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-127",
    itemCode: "KLM789",
    itemName: "Item 13",
    pieces: 65,
    receiveQty: 65,
    LPNNumber: "LPN789",
    batchNumber: "BATCH013",
    mfgDate: "2024-01-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-127",
    itemCode: "NOP012",
    itemName: "Item 14",
    pieces: 70,
    receiveQty: 70,
    LPNNumber: "LPN012",
    batchNumber: "BATCH014",
    mfgDate: "2024-02-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-127",
    itemCode: "QRS345",
    itemName: "Item 15",
    pieces: 75,
    receiveQty: 75,
    LPNNumber: "LPN345",
    batchNumber: "BATCH015",
    mfgDate: "2024-03-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-128",
    itemCode: "TUV678",
    itemName: "Item 16",
    pieces: 80,
    receiveQty: 80,
    LPNNumber: "LPN678",
    batchNumber: "BATCH016",
    mfgDate: "2024-04-01",
    expDate: "2024-12-31",
  },
  {
    binNumber: "BIN-128",
    itemCode: "WXY901",
    itemName: "Item 17",
    pieces: 85,
    receiveQty: 85,
    LPNNumber: "LPN901",
    batchNumber: "BATCH017",
    mfgDate: "2024-05-01",
    expDate: "2024-12-31",
  },
];

const BatchNOandLOC = () => {
  const tableHeaders = ["BIN No.", "Item", "Batch No.", "Exp. Date", "Onhand"];
  const tableVisibleProps = [
    "binNumber",
    "itemName",
    "batchNumber",
    "expDate",
    "pieces",
  ];

  return (
    <View style={generalStyles.innerContainer}>
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

export default BatchNOandLOC;
