import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../../src/store/store";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import SelectModal from "../../../../src/components/modals/SelectModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {generalStyles} from "../../../../src/styles/styles";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";
import {useInventoryTransactionHooks} from "../../../../src/hooks/inventoryTransactionHooks";
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
  } = useInventoryTransactionHooks({
    page: "sloc",
  });

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
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
            buttonUses="pto"
            selectType="pto"
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
            buttonUses="pto"
            postType="pto"
          />
        );

      default:
        break;
    }
  };

  console.log("SLOC");

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
          contentContainerStyle={{flexGrow: 1}}
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
            typeForFetching="pto"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectModal
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="S.LOC to S.LOC Details"
            propertiesToShow={[
              {name: "docnum", label: "Document Number"},
              {name: "intnum", label: "Other Number"},
            ]}
            customContent={<ItemsList uses="inbound" subcategory="pto" />}
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
