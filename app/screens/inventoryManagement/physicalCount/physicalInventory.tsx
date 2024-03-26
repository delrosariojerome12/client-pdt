import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { generalStyles } from "../../../../src/styles/styles";
import VerticalList from "../../../../src/components/list/verticalList";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SelectModal from "../../../../src/components/modals/SelectModal";
import SelectandScanModal from "../../../../src/components/modals/SelectandScanModal";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";
import { usePhysicalCountHooks } from "../../../../src/hooks/physicalCountHooks";
import InputWithSearch from "../../../../src/components/forms/inputs/InputWithSearch";

const PhysicalInventory = React.memo(() => {
  const {
    isPaginating,
    refreshing,
    onRefresh,
    isScanModal,
    isSelectModal,
    status,
    statusText,
    activeIndex,
    handleIndexChange,
    handleScroll,
    isSourceScanning,
    isTargetScanning,
    tableData,
    tableDetailsTotal,
    selectedDocument,
    isScanBinModal,
    filteredData,
    searchText,
    handleSearch,
    handleChangeSearchText,
  } = usePhysicalCountHooks({
    page: "physical-inventory-record",
  });

  const {
    handleScanModal,
    handleSelectModal,
    closeSelectModal,
    handlePost,
    // validateCycleCount,
    validatePhysicalRecord,
  } = useDocumentHooks();

  const checkStatus = () => {
    if (
      !isScanBinModal &&
      !refreshing &&
      !isPaginating &&
      tableDetailsTotal.status === "loading"
    ) {
      return true;
    }
    return undefined;
  };
  console.log("physical inventory");

  return (
    <>
      {status === "success" && !isSelectModal && !isScanModal && (
        <MessageToast
          status="success"
          text="Document Successfully Posted"
          speed={2500}
        />
      )}

      <View style={generalStyles.outerContainer}>
        <CustomButton
          title="SCAN PIR NO."
          onPress={handleScanModal}
          type="regular"
        />

        {status === "loading" && !isSelectModal && !isScanModal && (
          <CustomLoadingText text="Posting..." visible={true} />
        )}

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={() => {
              handleScanModal();
            }}
            placeholder="Waiting to Scan PIR NO. Barcode..."
            typeForFetching="physical-inventory"
            scanParams="pir"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectandScanModal
            usage="physical-count"
            loadingStatus={checkStatus()}
            visible={isSelectModal}
            onClose={() => {
              closeSelectModal();
            }}
            selectedItem={selectedDocument}
            title="Physical Inventory Record Details"
            propertiesToShow={[
              { name: "refnum", label: "PIR No." },
              { name: "warcde", label: "Warehouse" },
              { name: "warcdenum", label: "Warehouse No." },
              { name: "warloccde", label: "Storage Location" },
            ]}
            customContent={
              <ItemsList
                uses="physical-inventory"
                subcategory="physical-inventory"
              />
            }
          />
        )}

        <InputWithSearch
          label="Batch No."
          onShow={handleSearch}
          text={searchText}
          onTextChange={handleChangeSearchText}
        />
        <ScrollView
          style={generalStyles.innerContainer}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={0}
        >
          <VerticalList
            onValidate={validatePhysicalRecord}
            onSelect={handleSelectModal}
            data={searchText ? filteredData : tableData.data}
            selectType="physical-inventory"
            propertiesToShow={[
              { name: "trndte", label: "Date" },
              { name: "refnum", label: "PIR Number" },
              { name: "warcde", label: "Warehouse" },
              { name: "warcdenum", label: "Warehouse Number" },
              { name: "warloccde", label: "Storage Location" },
            ]}
            loadingStatus={
              tableData.status === "loading" &&
              !refreshing &&
              !isPaginating &&
              true
            }
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
    </>
  );
});

export default PhysicalInventory;
