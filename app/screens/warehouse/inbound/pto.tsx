import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {generalStyles} from "../../../../src/styles/styles";
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import {useInboundHooks} from "../../../../src/hooks/inboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";

const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
const tableVisibleProps = ["trndte", "docnum", "intnum"];

const PTO = () => {
  const {
    handleScroll,
    isPaginating,
    onRefresh,
    refreshing,
    pto,
    ptoDetails,
    isScanModal,
    isSelectModal,
    selectedDocument,
  } = useInboundHooks({
    page: "pto",
  });

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
    useDocumentHooks();

  if (pto.status === "loading" && !refreshing && !isPaginating) {
    return <LoadingSpinner />;
  }

  return (
    <View style={generalStyles.outerContainer}>
      <CustomButton title="SCAN WRR" onPress={handleScanModal} type="regular" />

      <ScrollView
        style={generalStyles.innerContainer}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={150}
      >
        <CustomTable
          tableHeaders={tableHeaders}
          tableData={pto.data}
          visibleProperties={tableVisibleProps}
          onSelect={handleSelectModal}
          onPost={handlePost}
          selectType="pto"
        />

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={handleScanModal}
            placeholder="Waiting to Scan WRR Barcode"
            scanParams={{category: "wrr"}}
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
          customContent={<ItemsList uses="inbound" subcategory="pto" />}
        />
      </ScrollView>

      {isPaginating && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            height: 100,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading more data...</Text>
        </View>
      )}
    </View>
  );
};

export default PTO;
