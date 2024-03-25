import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { generalStyles } from "../../../../src/styles/styles";
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import { useOutboundHooks } from "../../../../src/hooks/outboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";

const tableHeaders = ["Date", "Document No.", "STR No.", ""];
const tableVisibleProps = ["trndte", "docnum", "strnum"];

const WTO = () => {
  const {
    handleScroll,
    isPaginating,
    isScanModal,
    isSelectModal,
    onRefresh,
    refreshing,
    selectedDocument,
    wto,
    activeIndex,
    handleIndexChange,
    status,
    statusText,
    wtoOutboundDetails,
    isScanItemModal,
  } = useOutboundHooks({
    page: "wto",
  });

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  console.log("WTO outbound");

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
          title="SCAN STR NO."
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
          {activeIndex === 0 || activeIndex === null ? (
            <CustomTable
              tableHeaders={tableHeaders}
              tableData={wto.validation.data}
              visibleProperties={tableVisibleProps}
              isPostDisable={true}
              onSelect={handleSelectModal}
              selectType="wto-outbound"
              buttonUses="wto-outbound"
              loadingStatus={
                wto.validation.status === "loading" &&
                !isScanItemModal &&
                !refreshing &&
                !isPaginating &&
                true
              }
            />
          ) : (
            <CustomTable
              tableHeaders={tableHeaders}
              tableData={wto.forPosting.data}
              visibleProperties={tableVisibleProps}
              isSelectDisable={true}
              onPost={handlePost}
              postType="wto-outbound"
              buttonUses="wto-outbound"
              loadingStatus={
                wto.forPosting.status === "loading" &&
                !refreshing &&
                !isPaginating &&
                true
              }
            />
          )}

          {isScanModal && (
            <ScanModal
              usage="searching"
              visible={isScanModal}
              onClose={handleScanModal}
              placeholder="Waiting to Scan SRT No. Barcode..."
              scanParams={"wrr_wto_outbound"}
              typeForFetching="wto-outbound"
            />
          )}

          {isSelectModal && (
            <SelectModal
              loadingStatus={
                wtoOutboundDetails.status === "loading" &&
                !isScanItemModal &&
                true
              }
              visible={isSelectModal}
              onClose={closeSelectModal}
              selectedItem={selectedDocument}
              title="Warehouse Transfer Order Details"
              propertiesToShow={[
                { name: "docnum", label: "TO Number" },
                { name: "strnum", label: "STR Number" },
              ]}
              customContent={
                <ItemsList uses="outbound" subcategory="wto-outbound" />
              }
            />
          )}
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
};

export default WTO;
