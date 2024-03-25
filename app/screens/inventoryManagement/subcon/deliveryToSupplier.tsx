import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../src/store/store";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import SelectModal from "../../../../src/components/modals/SelectModal";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { generalStyles } from "../../../../src/styles/styles";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";

const DeliveryToSupplier = () => {
  const { isScanModal, isSelectModal } = useAppSelector((state) => state.modal);
  const { selectedDocument, tableData } = useAppSelector(
    (state) => state.document
  );
  const [activeIndex, setActiveIndex] = useState(0); // State to track the active index

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  const tableHeaders = ["Date", "TO. No.", "DTS Req. No.", ""];

  const tableVisibleProps = ["trndte", "docnum", "inrnum"];

  const handleChange = (index: number) => {
    setActiveIndex(index);
  };

  const renderTables = () => {
    switch (activeIndex) {
      case 0:
        // for validation
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            isPostDisable={true}
            buttonUses=""
          />
        );
      case 1:
        // for POSTING
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={tableData.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            buttonUses=""
          />
        );

      default:
        break;
    }
  };

  console.log("delivery to supplier", tableData);
  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton
        title="SCAN DTS TO NO."
        onPress={handleScanModal}
        type="regular"
      />

      <SwitchButton
        activeIndex={activeIndex}
        onChange={handleChange}
        options={["FOR VALIDATION", "FOR POSTING"]}
      />

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        placeholder="Waiting to Scan DTS TO. Barcode..."
      />

      {renderTables()}

      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        title="Delivery To Supplier TO Details"
        propertiesToShow={[{ name: "docnum", label: "DTS TO No. " }]}
        customContent={<ItemsList uses="subcon" />}
      />
    </View>
  );
};

export default DeliveryToSupplier;
