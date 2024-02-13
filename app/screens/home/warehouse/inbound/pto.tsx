import {View, Text} from "react-native";
import React from "react";
import {useAppSelector} from "../../../../../src/store/store";
import CustomButton from "../../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../../src/components/modals/ScanModal";
import SelectModal from "../../../../../src/components/modals/SelectModal";
import {useDocumentHooks} from "../../../../../src/hooks/documentHooks";
import {generalStyles} from "../../../../../src/styles/styles";
import PTOItemsList from "../../../../../src/components/pto/PTOItemsList";

const PTO = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const {handleScanModal, handleSelectModal, closeSelectModal} =
    useDocumentHooks();

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

  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton title="SCAN WRR" onPress={handleScanModal} type="regular" />
      <CustomTable
        tableHeaders={tableHeaders}
        tableData={tableData}
        visibleProperties={tableVisibleProps}
        onSelect={handleSelectModal}
      />
      <ScanModal visible={isScanModal} onClose={handleScanModal} />
      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        title="Purchase Transfer Order Details"
        propertiesToShow={[
          {name: "docnum", label: "Document Number"},
          {name: "inrnum", label: "Other Number"},
        ]}
        customContent={<PTOItemsList />}
      />
    </View>
  );
};

export default PTO;
