import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import ScanModal from "../../../../src/components/modals/ScanModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {useAppSelector} from "../../../../src/store/store";
import {generalStyles} from "../../../../src/styles/styles";
import VerticalList from "../../../../src/components/list/verticalList";
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";

const PhysicalInventory = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const {
    handleScanModal,
    handleSelectModal,
    closeSelectModal,
    handlePost,
    validatePhysicalRecord,
  } = useDocumentHooks();

  const data = [
    {
      warehouse: "Warehouse A",
      whsNo: "WH001",
      date: "2024-02-17",
      ccrNo: "CCR001",
      sLoc: "good",
      pirNo: "123ANC",
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
      warehouse: "Warehouse B",
      whsNo: "WH002",
      date: "2024-02-17",
      ccrNo: "CCR002",
      sLoc: "bad",
      pirNo: "123ANC",

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
      ],
    },
    {
      warehouse: "Warehouse C",
      whsNo: "WH003",
      date: "2024-02-17",
      ccrNo: "CCR003",
      sLoc: "good",
    },
    {
      warehouse: "Warehouse D",
      whsNo: "WH003",
      date: "2024-02-17",
      ccrNo: "CCR003",
      sLoc: "good",
      pirNo: "123ANC",
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
      ],
    },
  ];

  console.log("physical inventory");

  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton
        title="SCAN PIR NO."
        onPress={handleScanModal}
        type="regular"
      />

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        placeholder="Waiting to Scan PIR NO. Barcode..."
      />

      <VerticalList
        data={data}
        onValidate={validatePhysicalRecord}
        onSelect={handleSelectModal}
        propertiesToShow={[
          {name: "warehouse", label: "Warehouse"},
          {name: "whsNo", label: "Warehouse Number"},
          {name: "date", label: "Date"},
          {name: "ccrNo", label: "CCR Number"},
          {name: "sLoc", label: "Storage Location"},
        ]}
      />
      {/* may error dito on click */}
      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        title="Physical Inventory Record Details"
        propertiesToShow={[
          {name: "pirNo", label: "PIR No. "},
          {name: "warehouse", label: "Warehouse"},
          {name: "whsNo", label: "WHS No. "},
          {name: "ccrNo", label: "Scanned/Counted "},
          {name: "sLoc", label: "Storage Location"},
        ]}
        customContent={<ItemsList uses="physicalInventory" />}
        scanOptions={{
          scanModal: true,
          scanCounted: true,
          showPending: true,
          scanModalDetails: {
            placeholder: "Waiting to Scan Bin No. Barcode...",
            title: "SCAN BIN NO. / ITEM",
          },
        }}
      />
    </View>
  );
};

export default PhysicalInventory;
