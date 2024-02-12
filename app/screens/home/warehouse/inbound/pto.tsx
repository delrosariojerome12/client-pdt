import {View, Text} from "react-native";
import React from "react";
import {useAppSelector} from "../../../../../src/store/store";
import CustomButton from "../../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../../src/components/modals/ScanModal";
import SelectModal from "../../../../../src/components/modals/SelectModal";
import {useDocumentHooks} from "../../../../../src/hooks/documentHooks";
import {generalStyles} from "../../../../../src/styles/styles";

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
      />
    </View>
  );
};

export default PTO;
