import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { generalStyles } from "../../../../src/styles/styles";
import { useInboundHooks } from "../../../../src/hooks/inboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";

const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
const tableVisibleProps = ["trndte", "docnum", "intnum"];

const PUR = () => {
  const {
    handleScroll,
    isPaginating,
    onRefresh,
    refreshing,
    pur,
    isScanModal,
    status,
    statusText,
  } = useInboundHooks({
    page: "pur",
  });

  const { handleScanModal, handlePost } = useDocumentHooks();

  console.log("PUR");

  return (
    <>
      {status === "success" && !isScanModal && (
        <MessageToast
          status="success"
          text={"Document Successfully Posted Putway TO"}
          speed={2500}
        />
      )}

      <View style={generalStyles.outerContainer}>
        <CustomButton
          title="SCAN LPN NO."
          onPress={handleScanModal}
          type="regular"
        />

        {status === "loading" && !isScanModal && (
          <CustomLoadingText text="Posting..." visible={true} />
        )}

        <ScrollView
          style={generalStyles.innerContainer}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={150}
        >
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={pur.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            postType="pur"
            buttonUses="pur"
            loadingStatus={pur.status === "loading" && true}
          />

          {isScanModal && (
            <ScanModal
              usage="scanning"
              visible={isScanModal}
              onClose={handleScanModal}
              placeholder="Waiting to Scan LPN No."
              isNextBtn={true}
              scanParams={"lpnnum"}
              typeForFetching="pur"
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

export default PUR;
