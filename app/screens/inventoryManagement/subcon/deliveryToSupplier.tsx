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
import SelectModal from "../../../../src/components/modals/SelectModal";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { generalStyles } from "../../../../src/styles/styles";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";
import { useSubConHooks } from "../../../../src/hooks/subconHooks";

const tableHeaders = ["Date", "TO. No.", "DTS Req. No.", ""];
const tableVisibleProps = ["createdte", "docnum", "dtsreqnum"];

const StockTransfer = React.memo(() => {
  const {
    isPaginating,
    refreshing,
    onRefresh,
    isScanModal,
    isSelectModal,
    status,
    activeIndex,
    handleIndexChange,
    handleScroll,
    deliveryToSupplier,
    deliveryToSupplierDetails,
    isOutboundItemScan,
    selectedDocument,
  } = useSubConHooks({
    page: "deliveryToSupplier",
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
            tableData={deliveryToSupplier.validation.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            isPostDisable={true}
            buttonUses=""
            selectType="dts"
            loadingStatus={
              !isOutboundItemScan &&
              deliveryToSupplier.validation.status === "loading" &&
              !refreshing &&
              !isPaginating &&
              true
            }
          />
        );
      case 1:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={deliveryToSupplier.forPosting.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            buttonUses=""
            postType="dts"
            loadingStatus={
              !isOutboundItemScan &&
              deliveryToSupplier.forPosting.status === "loading" &&
              !refreshing &&
              !isPaginating &&
              true
            }
          />
        );

      default:
        break;
    }
  };

  const checkStatus = () => {
    if (!isOutboundItemScan && deliveryToSupplierDetails.status === "loading") {
      return true;
    }
    return undefined;
  };

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
          title="SCAN DTS TO NO."
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
          scrollEventThrottle={0}
        >
          {renderTables()}
        </ScrollView>

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={handleScanModal}
            placeholder="Waiting to Scan DTS TO Barcode..."
            scanParams="dts"
            typeForFetching="dts"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectModal
            loadingStatus={checkStatus()}
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="Delivery To Supplier TO Details"
            propertiesToShow={[{ name: "docnum", label: "DTS TO No." }]}
            customContent={<ItemsList uses="subcon" subcategory="dts" />}
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

export default StockTransfer;
