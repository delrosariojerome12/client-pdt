import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useAppSelector } from "../../../../src/store/store";
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
import { useInventoryTransactionHooks } from "../../../../src/hooks/inventoryTransactionHooks";

const tableHeaders = ["TO. No.", "BTB No.", ""];

const tableVisibleProps = ["docnum", "btbnum"];

const StockTransfer = React.memo(() => {
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
    stockTransfer,
    stockTransferDetails,
    isSourceScanning,
    isTargetScanning,
  } = useInventoryTransactionHooks({
    page: "stockTransfer",
  });

  const { selectedDocument } = useAppSelector((state) => state.document);

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  const renderTables = () => {
    switch (activeIndex) {
      case 0:
      case null:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={stockTransfer.validation.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            isPostDisable={true}
            buttonUses=""
            selectType="stock-transfer"
            loadingStatus={
              stockTransfer.validation.status === "loading" &&
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
            tableData={stockTransfer.forPosting.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            buttonUses=""
            postType="stock-transfer"
            loadingStatus={
              stockTransfer.forPosting.status === "loading" &&
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

  console.log("Stock transfer", stockTransferDetails);
  const checkStatus = () => {
    if (
      !isTargetScanning &&
      !isSourceScanning &&
      stockTransferDetails.status === "loading"
    ) {
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
            scanParams="bnt"
            typeForFetching="stock-transfer"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectModal
            loadingStatus={checkStatus()}
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="Stock Transfer (BIN to BIN) Details"
            propertiesToShow={[
              { name: "docnum", label: "TO No." },
              { name: "warcde", label: "Warehouse" },
              { name: "refnum", label: "SLOC Trans. No." },
              { name: "warcdenum", label: "Whs No." },
              { name: "btbnum", label: "BTB No." },
              {
                name: "warloccde",
                label: "S.Loc.",
              },
            ]}
            customContent={
              <ItemsList uses="stock-transfer" subcategory="stock-transfer" />
            }
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
