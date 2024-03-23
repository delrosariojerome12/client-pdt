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
import NotificationModal from "../../../../src/components/modals/NotificationModal";

const tableHeaders = ["Date", "Document No.", "Intransit No.", ""];
const tableVisibleProps = ["trndte", "docnum", "intnum"];

const PTO = () => {
  const {
    handleScroll,
    isPaginating,
    onRefresh,
    refreshing,
    pto,
    ptoDetails,
    isScanModal,
    isScanItemModal,
    isSelectModal,
    selectedDocument,
    status,
  } = useInboundHooks({
    page: "pto",
  });

  const { handleScanModal, handleSelectModal, closeSelectModal, handlePost } =
    useDocumentHooks();

  console.log("pto");

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
          scrollEventThrottle={150}
        >
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={pto.data}
            visibleProperties={tableVisibleProps}
            onSelect={handleSelectModal}
            onPost={handlePost}
            selectType="pto"
            postType="pto"
            buttonUses="pto"
            loadingStatus={pto.status === "loading" && !isScanItemModal && true}
          />

          {isScanModal && (
            <ScanModal
              usage="searching"
              visible={isScanModal}
              onClose={handleScanModal}
              placeholder="Waiting to Scan WRR Barcode"
              scanParams={"wrr"}
              typeForFetching="pto"
            />
          )}

          {isSelectModal && (
            <SelectModal
              loadingStatus={
                ptoDetails.status === "loading" && !isScanItemModal && true
              }
              visible={isSelectModal}
              onClose={closeSelectModal}
              selectedItem={selectedDocument}
              title="Purchase Transfer Order Details"
              propertiesToShow={[
                { name: "docnum", label: "Document Number" },
                { name: "intnum", label: "Intransit Number" },
              ]}
              customContent={<ItemsList uses="inbound" subcategory="pto" />}
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

export default PTO;
