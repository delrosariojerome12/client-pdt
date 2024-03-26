import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
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
import { useReplenishmentHooks } from "../../../../src/hooks/replenishmentHooks";

const tableHeaders = ["Date", "TO. No.", ""];
const tableVisibleProps = ["createdte", "docnum"];

const StockReplenish = React.memo(() => {
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
    tableDetails,
    selectedDocument,
  } = useReplenishmentHooks({
    page: "stockReplenishment",
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
            tableData={tableData.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            isPostDisable={true}
            buttonUses=""
            selectType="stock-replenish"
            loadingStatus={
              tableData.status === "loading" &&
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
            tableData={tableData.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            buttonUses=""
            postType="stock-replenish"
            loadingStatus={
              tableData.status === "loading" &&
              !refreshing &&
              !isPaginating &&
              true
            }
            validatePost={true}
          />
        );

      default:
        break;
    }
  };

  const checkStatus = () => {
    if (
      !isTargetScanning &&
      !isSourceScanning &&
      tableDetails.status === "loading"
    ) {
      return true;
    }
    return undefined;
  };

  console.log("Stock Replenish");

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
          title="SCAN STR TO"
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
            placeholder="Waiting to Scan STR TO Barcode..."
            scanParams="whrepto"
            typeForFetching="stock-replenish"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectModal
            loadingStatus={checkStatus()}
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="Stock Replenishment TO Details"
            propertiesToShow={[{ name: "docnum", label: "STR TO No." }]}
            customContent={
              <ItemsList uses="stock-transfer" subcategory="stock-replenish" />
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

export default StockReplenish;
