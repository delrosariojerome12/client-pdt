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

const tableHeaders = ["Date", "Document No.", "SRT No.", ""];
const tableVisibleProps = ["trndte", "docnum", "srtdocnum"];

const SRTO = () => {
  const {
    handleScroll,
    isPaginating,
    onRefresh,
    refreshing,
    srto,
    isScanModal,
    isSelectModal,
    selectedDocument,
    isScanItemModal,
    status,
    srtoDetails,
  } = useInboundHooks({
    page: "srto",
  });

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  console.log("SRTO");

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
          title="SCAN SRT"
          onPress={handleScanModal}
          type="regular"
        />
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
            tableData={srto.data}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
            selectType="srto"
            buttonUses="srto"
            loadingStatus={
              srto.status === "loading" &&
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
              placeholder="Waiting to Scan SRT Barcode..."
              scanParams={"wrr_srto"}
              typeForFetching="srto"
              usage="searching"
            />
          )}

          {isSelectModal && (
            <SelectModal
              loadingStatus={
                srtoDetails.status === "loading" && !isScanItemModal && true
              }
              visible={isSelectModal}
              onClose={closeSelectModal}
              selectedItem={selectedDocument}
              title="Sales Return Transfer Order Details"
              propertiesToShow={[
                { name: "docnum", label: "TO Number" },
                { name: "srtdocnum", label: "SRT Number" },
              ]}
              customContent={<ItemsList uses="inbound" subcategory="srto" />}
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

export default SRTO;
