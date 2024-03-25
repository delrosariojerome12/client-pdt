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
import { useInboundHooks } from "../../../../src/hooks/inboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";
import MessageToast from "../../../../src/components/message-toast/MessageToast";

const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
const tableVisibleProps = ["trndte", "docnum", "intnum"];

const WTO = () => {
  const {
    handleScroll,
    isPaginating,
    onRefresh,
    refreshing,
    wto,
    isScanModal,
    isScanItemModal,
    isSelectModal,
    selectedDocument,
    status,
    wtoDetails,
  } = useInboundHooks({
    page: "wto",
  });

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  console.log("WTO");

  return (
    <>
      {status === "success" &&
        !isSelectModal &&
        !isScanModal &&
        !isScanItemModal && (
          <MessageToast
            status="success"
            text="Document Successfully Posted"
            speed={2500}
          />
        )}

      <View style={generalStyles.outerContainer}>
        <CustomButton
          title="SCAN WRR"
          onPress={handleScanModal}
          type="regular"
        />

        {status === "loading" && !isSelectModal && !isScanModal && (
          <CustomLoadingText text="Posting..." visible={true} />
        )}

        <ScrollView
          style={generalStyles.innerContainer}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={0}
        >
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={wto.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            onPost={handlePost}
            selectType="wto-inbound"
            postType="wto-inbound"
            buttonUses="wto-inbound"
            loadingStatus={
              wto.status === "loading" &&
              !isScanItemModal &&
              !refreshing &&
              !isPaginating &&
              true
            }
          />

          {isScanModal && (
            <ScanModal
              visible={isScanModal}
              onClose={handleScanModal}
              placeholder="Waiting to Scan WRR Barcode"
              scanParams={"wrr_wto"}
              typeForFetching="wto-inbound"
              usage="searching"
            />
          )}

          {isSelectModal && (
            <SelectModal
              visible={isSelectModal}
              onClose={closeSelectModal}
              selectedItem={selectedDocument}
              loadingStatus={
                wtoDetails.status === "loading" && !isScanItemModal && true
              }
              title="Warehouse Transfer Order Details"
              propertiesToShow={[
                { name: "docnum", label: "Document Number" },
                { name: "intnum", label: "Intransit Number" },
              ]}
              customContent={
                <ItemsList uses="inbound" subcategory="wto-inbound" />
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
              gap: 10,
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
