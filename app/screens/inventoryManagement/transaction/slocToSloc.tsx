import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
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
import { useInventoryTransactionHooks } from "../../../../src/hooks/inventoryTransactionHooks";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";

const tableHeaders = ["TO. No.", "S.LOC Trans No.", ""];
const tableVisibleProps = ["docnum", "refnum"];

const SlocToSloc = React.memo(() => {
  const {
    sloc,
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
    selectedDocument,
    slocDetails,
    isSourceScanning,
    isTargetScanning,
  } = useInventoryTransactionHooks({
    page: "sloc",
  });

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  const renderTables = () => {
    switch (activeIndex) {
      case 0:
      case null:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={sloc.validation.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            isPostDisable={true}
            buttonUses=""
            selectType="sloc"
            loadingStatus={
              sloc.validation.status === "loading" && !refreshing && true
            }
          />
        );
      case 1:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={sloc.forPosting.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            buttonUses=""
            postType="sloc"
            loadingStatus={
              sloc.validation.status === "loading" && !refreshing && true
            }
          />
        );

      default:
        break;
    }
  };

  console.log("SLOC");

  const checkStatus = () => {
    if (
      !isTargetScanning &&
      !isSourceScanning &&
      slocDetails.status === "loading"
    ) {
      return true;
    }
    return undefined;
  };

  checkStatus();

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
          title="SCAN TO. NO."
          onPress={handleScanModal}
          type="regular"
        />
        {status === "loading" && !isSelectModal && !isScanModal && (
          <CustomLoadingText text="Posting..." visible={true} />
        )}

        <SwitchButton
          options={["FOR VALIDATION", "FOR POSTING"]}
          activeIndex={!activeIndex ? 0 : activeIndex}
          onChange={handleIndexChange}
        />

        <ScrollView
          style={generalStyles.innerContainer}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={150}
        >
          {renderTables()}
        </ScrollView>

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={handleScanModal}
            placeholder="Waiting to Scan TO. No."
            scanParams="sloc"
            typeForFetching="sloc"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectModal
            // loadingStatus={slocDetails.status === "loading" && true}
            loadingStatus={checkStatus()}
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="S.LOC to S.LOC Details"
            propertiesToShow={[
              { name: "docnum", label: "TO No." },
              { name: "warcde", label: "DC-Marilao" },
              { name: "warloccde2", label: "S.Loc To" },
              { name: "refnum", label: "SLOC Trans. No." },
              { name: "warcdenum", label: "Whs No. From" },
              { name: "warcdenum2", label: "Whs To. From" },
            ]}
            customContent={<ItemsList uses="sloc" subcategory="sloc" />}
          />
        )}
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

export default SlocToSloc;
