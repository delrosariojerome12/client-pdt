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

const StockReplenish = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
    useDocumentHooks();
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index

  const tableHeaders = ["Date", "Document No.", ""];
  // const tableData: any = [];
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

  const tableVisibleProps = ["trndte", "docnum"];

  const handleChange = (index: number) => {
    setActiveIndex(index); // Update the active index
  };

  console.log("stock replenish");

  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton
        title="SCAN STR TO"
        onPress={handleScanModal}
        type="regular"
      />
      <SwitchButton
        options={["FOR VALIDATION", "FOR POSTING"]}
        activeIndex={activeIndex}
        onChange={handleChange}
      />

      {activeIndex === 0 ? (
        <CustomTable
          tableHeaders={tableHeaders}
          tableData={tableData}
          visibleProperties={tableVisibleProps}
          isPostDisable={true}
          onSelect={handleSelectModal}
        />
      ) : (
        <CustomTable
          tableHeaders={tableHeaders}
          tableData={tableData}
          visibleProperties={tableVisibleProps}
          isSelectDisable={true}
          onPost={handlePost}
        />
      )}

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        placeholder="Waiting to Scan STR TO Barcode..."
      />

      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        title="Stock Replenishment TO Details"
        propertiesToShow={[{name: "inrnum", label: "STR Number"}]}
        customContent={<ItemsList uses="stockTransfer" />}
      />
    </View>
  );
};

export default StockReplenish;
