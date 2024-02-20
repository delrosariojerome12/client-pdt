import {View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {useAppSelector} from "../../../../src/store/store";
import {generalStyles} from "../../../../src/styles/styles";
import VerticalList from "../../../../src/components/list/verticalList";
import SelectModal from "../../../../src/components/modals/SelectModal";

const CycleCount = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);

  const {
    handleScanModal,
    handleSelectModal,
    closeSelectModal,
    handlePost,
    validateCycleCount,
  } = useDocumentHooks();

  const data = [
    {
      warehouse: "Warehouse A",
      whsNo: "WH001",
      date: "2024-02-17",
      ccrNo: "CCR001",
      sLoc: "good",
    },
    {
      warehouse: "Warehouse B",
      whsNo: "WH002",
      date: "2024-02-17",
      ccrNo: "CCR002",
      sLoc: "bad",
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
    },
  ];

  console.log("cycle count");
  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton
        title="SCAN CRR NO."
        onPress={handleScanModal}
        type="regular"
      />

      <ScanModal
        visible={isScanModal}
        onClose={handleScanModal}
        placeholder="Waiting to Scan CRR NO. ..."
      />

      <VerticalList
        onValidate={validateCycleCount}
        onSelect={handleSelectModal}
        data={data}
        propertiesToShow={[
          {name: "warehouse", label: "Warehouse"},
          {name: "whsNo", label: "Warehouse Number"},
          {name: "date", label: "Date"},
          {name: "ccrNo", label: "CCR Number"},
          {name: "sLoc", label: "Storage Location"},
        ]}
      />
    </View>
  );
};

export default CycleCount;
