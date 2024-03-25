import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { useAppSelector } from "../../../../src/store/store";
import { generalStyles } from "../../../../src/styles/styles";
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";

const StockReplenish = () => {
  const { isScanModal, isSelectModal } = useAppSelector((state) => state.modal);
  const { selectedDocument, tableData } = useAppSelector(
    (state) => state.document
  );

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index

  const tableHeaders = ["Date", "Document No.", ""];

  const tableVisibleProps = ["trndte", "docnum"];

  const handleChange = (index: number) => {
    setActiveIndex(index); // Update the active index
  };

  const renderTables = () => {
    switch (activeIndex) {
      case 0:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData.data}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
            buttonUses=""
          />
        );
      case 1:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData.data}
            visibleProperties={tableVisibleProps}
            isSelectDisable={true}
            onPost={handlePost}
            buttonUses=""
          />
        );
    }
  };

  console.log("stock replenish", tableData);

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

      {renderTables()}

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        placeholder="Waiting to Scan STR TO Barcode..."
        scanParams="bnt"
        typeForFetching="cyclecount"
        usage="searching"
      />

      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        title="Stock Replenishment TO Details"
        propertiesToShow={[{ name: "inrnum", label: "STR Number" }]}
        customContent={
          <ItemsList uses="stock-transfer" subcategory="stock-transfer" />
        }
      />
    </View>
  );
};

export default StockReplenish;
