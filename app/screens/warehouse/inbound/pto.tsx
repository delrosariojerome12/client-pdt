import React, {useEffect, useState} from "react";
import {View, Text, ScrollView, RefreshControl} from "react-native";
import {useAppSelector, useAppDispatch} from "../../../../src/store/store";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import SelectModal from "../../../../src/components/modals/SelectModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {generalStyles} from "../../../../src/styles/styles";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import {
  getPTO,
  paginatePTO,
} from "../../../../src/store/actions/warehouse/warehouseActions";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";
import {ToastMessage} from "../../../../src/helper/Toast";

const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
const tableVisibleProps = ["trndte", "docnum", "intnum"];

const PTO = () => {
  const {isScanModal, isSelectModal} = useAppSelector((state) => state.modal);
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {pto, ptoDetails} = useAppSelector((state) => state.inbound);

  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isPaginating, setPaginating] = useState(false);

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
    useDocumentHooks();

  useEffect(() => {
    dispatch(getPTO({limit: 10, offset: 0}));
  }, []);

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    const bottomOffset = contentSize.height - layoutMeasurement.height;
    const currentOffset = contentOffset.y;

    const threshold = 50;

    console.log(contentOffset);
    console.log(bottomOffset);

    // Check if scrolled to the very bottom within the threshold
    if (currentOffset >= bottomOffset - threshold && !isPaginating) {
      fetchData();
    }
  };

  const fetchData = () => {
    setPaginating(true);
    const newOffset = pto.data.length + 10;
    dispatch(paginatePTO({limit: 10, offset: newOffset})).then(() => {
      ToastMessage("Table updated.", 1000);
      setPaginating(false);
    });
  };

  const onRefresh = () => {
    dispatch(getPTO({limit: 10, offset: 0})).then(() => {
      ToastMessage("Refresh Success", 1000);
    });
  };

  if (pto.status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView
      style={generalStyles.innerContainer}
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={handleScroll}
      // scrollEventThrottle={400}
    >
      {/* <View style={generalStyles.innerContainer}> */}
      <CustomButton title="SCAN WRR" onPress={handleScanModal} type="regular" />
      <CustomTable
        tableHeaders={tableHeaders}
        tableData={pto.data}
        visibleProperties={tableVisibleProps}
        onSelect={handleSelectModal}
        onPost={handlePost}
      />

      {isScanModal && (
        <ScanModal
          visible={isScanModal}
          onClose={handleScanModal}
          placeholder="Waiting to Scan WRR Barcode"
        />
      )}

      <SelectModal
        visible={isSelectModal}
        onClose={closeSelectModal}
        selectedItem={selectedDocument}
        loadingStatus={ptoDetails.status === "loading"}
        title="Purchase Transfer Order Details"
        propertiesToShow={[
          {name: "docnum", label: "Document Number"},
          {name: "intnum", label: "Intransit Number"},
        ]}
        customContent={<ItemsList uses="inbound" />}
      />
      {/* </View> */}
    </ScrollView>
  );
};

export default PTO;
