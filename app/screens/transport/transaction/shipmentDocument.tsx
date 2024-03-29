import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {useAppSelector} from "../../../../src/store/store";
import {generalStyles} from "../../../../src/styles/styles";
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";

const ShipmentDocument = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
    useDocumentHooks();
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index

  const tableHeaders = ["Document No.", "Date", "Status", ""];
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
  const tableVisibleProps = ["docnum", "trndte", ""];

  const handleChange = (index: number) => {
    setActiveIndex(index); // Update the active index
  };

  const renderTables = () => {
    switch (activeIndex) {
      case 0:
        // PENDING
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
          />
        );
      case 1:
        //CHECKED IN
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
          />
        );
      case 2:
        //LOADING START

        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
          />
        );
      case 3:
        //POSTING
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData}
            visibleProperties={tableVisibleProps}
            isSelectDisable={true}
            onPost={handlePost}
          />
        );

      default:
        break;
    }
  };

  console.log("shipment document");

  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton
        title="SCAN SHIPMENT DOCUMENT"
        onPress={handleScanModal}
        type="regular"
      />
      <SwitchButton
        options={["PENDING", "CHECKED-IN", "LOADING START", "POSTING"]}
        activeIndex={activeIndex}
        onChange={handleChange}
      />

      {renderTables()}

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        placeholder="Waiting to Scan Single Pick Barcode..."
      />

      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        title="Warehouse Transfer Order Details"
        propertiesToShow={[
          {name: "docnum", label: "TO Number"},
          {name: "inrnum", label: "STR Number"},
        ]}
        customContent={<ItemsList uses="outbound" />}
      />
    </View>
  );
};

export default ShipmentDocument;
