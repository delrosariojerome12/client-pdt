import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {useAppSelector} from "../../../../src/store/store";
import {generalStyles} from "../../../../src/styles/styles";
import {useIsFocused} from "@react-navigation/native";

const PUR = () => {
  const {isScanModal} = useAppSelector((state) => state.modal);

  const {handleScanModal, handlePost} = useDocumentHooks();
  const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
  const tableData = [
    {
      trndte: "01-26-2024",
      docnum: "PTO-002021",
      inrnum: "INT-003333",
      items: [
        {
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
          itemCode: "GHI789",
          itemName: "Item 3",
          pieces: 15,
          receiveQty: 15,
          LPNNumber: "LPN789",
          batchNumber: "BATCH003",
          mfgDate: "2023-03-01",
          expDate: "2024-12-31",
        },
      ],
    },
    {
      trndte: "01-26-2024",
      docnum: "PTO-002021",
      inrnum: "INT-002222",
      items: [
        {
          itemCode: "DEF456",
          itemName: "Item 2",
          pieces: 10,
          receiveQty: 10,
          LPNNumber: "LPN456",
          batchNumber: "BATCH002",
          mfgDate: "2023-02-01",
          expDate: "2024-12-31",
        },
      ],
    },
    {
      trndte: "01-26-2024",
      docnum: "PTO-002021",
      inrnum: "INT-001111",
      items: [
        {
          itemCode: "GHI789",
          itemName: "Item 3",
          pieces: 15,
          receiveQty: 15,
          LPNNumber: "LPN789",
          batchNumber: "BATCH003",
          mfgDate: "2023-03-01",
          expDate: "2024-12-31",
        },
      ],
    },
  ];
  const tableVisibleProps = ["trndte", "docnum", "inrnum"];
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("api call");
  }, []);

  console.log("PUR");
  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton
        title="SCAN LPN NO."
        onPress={handleScanModal}
        type="regular"
        // onPress={() => setIsScanModalVisible(!isScanModalVisible)}
      />
      <CustomTable
        tableHeaders={tableHeaders}
        tableData={tableData}
        visibleProperties={tableVisibleProps}
        onPost={handlePost}
        // onSelect={handleSelectModal}
        isSelectDisable={true}
      />

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        // visible={isScanModalVisible}
        // onClose={() => setIsScanModalVisible(!isScanModalVisible)}
        placeholder="Waiting to Scan LPN No."
        isNextBtn={true}
      />
    </View>
  );
};

export default PUR;
