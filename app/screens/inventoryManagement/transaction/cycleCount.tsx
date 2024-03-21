import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, {useEffect, useState} from "react";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomTable from "../../../../src/components/forms/table/CustomTable";
import ScanModal from "../../../../src/components/modals/ScanModal";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {useAppSelector} from "../../../../src/store/store";
import {generalStyles} from "../../../../src/styles/styles";
import VerticalList from "../../../../src/components/list/verticalList";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SelectModal from "../../../../src/components/modals/SelectModal";
import SelectandScanModal from "../../../../src/components/modals/SelectandScanModal";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";
import {useInventoryTransactionHooks} from "../../../../src/hooks/inventoryTransactionHooks";

const CycleCount = React.memo(() => {
  const {
    cycle,
    isPaginating,
    refreshing,
    onRefresh,
    isScanModal,
    isSelectModal,
    status,
    statusText,
    checkPageToPaginate,
    selectedDocument,
    cycleCountDetails,
    handleScroll,
  } = useInventoryTransactionHooks({
    page: "cycleCount",
  });

  const {
    handleScanModal,
    handleSelectModal,
    closeSelectModal,
    handlePost,
    validateCycleCount,
  } = useDocumentHooks();

  console.log("cycle count");

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
          title="SCAN CRR NO."
          onPress={handleScanModal}
          type="regular"
        />

        {status === "loading" && !isSelectModal && !isScanModal && (
          <CustomLoadingText text="Posting..." visible={true} />
        )}

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={() => {
              handleScanModal();
            }}
            placeholder="Waiting to Scan CRR NO. ..."
            typeForFetching="cyclecount"
            scanParams="cc"
            usage="searching"
          />
        )}

        {isSelectModal && (
          <SelectandScanModal
            loadingStatus={cycleCountDetails.status === "loading" && true}
            visible={isSelectModal}
            onClose={() => {
              closeSelectModal();
            }}
            selectedItem={selectedDocument}
            title="Cycle Count Details"
            propertiesToShow={[
              {name: "docnum", label: "CCR No."},
              {name: "warcde", label: "Warehouse"},
              {name: "warcdenum", label: "Warehouse No."},
              {name: "warloccde", label: "Storage Location"},
            ]}
            customContent={
              <ItemsList uses="physicalInventory" subcategory="cyclecount" />
            }
            scanOptions={{
              scanModal: true,
              scanModalDetails: {
                placeholder: "Waiting to Scan Bin No. Barcode...",
                title: "SCAN BIN NO. / ITEM",
              },
            }}
          />
        )}
        <ScrollView
          style={generalStyles.innerContainer}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={150}
        >
          <VerticalList
            onValidate={validateCycleCount}
            onSelect={handleSelectModal}
            data={cycle.data}
            selectType="cyclecount"
            propertiesToShow={[
              {name: "trndte", label: "Date"},
              {name: "docnum", label: "CCR Number"},
              {name: "warcde", label: "Warehouse"},
              {name: "warcdenum", label: "Warehouse Number"},
              {name: "warloccde", label: "Storage Location"},
            ]}
          />
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
});

export default CycleCount;
