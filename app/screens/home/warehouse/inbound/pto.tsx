import {View, Text} from "react-native";
import React from "react";
import {generalStyles} from "../../../../../src/styles/styles";
import CustomButton from "../../../../../src/components/forms/buttons/CustomButton";
import {useDocumentHooks} from "../../../../../src/hooks/documentHooks";
import CustomTable from "../../../../../src/components/forms/table/CustomTable";

const PTO = () => {
  const {handleScanModal} = useDocumentHooks();
  const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
  const tableData = [
    {
      trndte: "01-26-2024",
      docnum: "PTO-002021",
      inrnum: "INT-003333",
    },
    {
      trndte: "01-26-2024",
      docnum: "PTO-002021",
      inrnum: "INT-002222",
    },
    {
      trndte: "01-26-2024",
      docnum: "PTO-002021",
      inrnum: "INT-001111",
    },
  ];
  const tableVisibleProps = ["trndte", "docnum", "inrnum"];

  const handleOpenScan = () => {};

  const handleSelect = (selectedItem: any) => {
    console.log(selectedItem);
  };

  return (
    <View style={generalStyles.innerContainer}>
      <CustomButton title="SCAN WRR" onPress={handleOpenScan} type="regular" />
      <CustomTable
        tableHeaders={tableHeaders}
        tableData={tableData}
        visibleProperties={tableVisibleProps}
        // onSelect={handleSelect}
      />
    </View>
  );
};

export default PTO;
