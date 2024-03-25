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
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { generalStyles } from "../../../../src/styles/styles";
import { useInboundHooks } from "../../../../src/hooks/inboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";

const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
const tableVisibleProps = ["trndte", "docnum", "intnum"];

const WHS = () => {
  const {
    handleScroll,
    isPaginating,
    onRefresh,
    status,
    whs,
    isScanModal,
    refreshing,
  } = useInboundHooks({
    page: "whs",
  });

  const { handleScanModal, handlePost } = useDocumentHooks();

  console.log("WHS");

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
            tableData={whs.data}
            visibleProperties={tableVisibleProps}
            onPost={handlePost}
            isSelectDisable={true}
            buttonUses="whs"
            postType="whs"
            loadingStatus={
              whs.status === "loading" && !refreshing && !isPaginating && true
            }
          />

          {isScanModal && (
            <ScanModal
              visible={isScanModal}
              onClose={handleScanModal}
              placeholder="Waiting to Scan LPN No."
              isNextBtn={true}
              scanParams={"lpnnum"}
              typeForFetching="whs"
              usage="scanning"
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

export default WHS;
