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
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";
import { useOutboundHooks } from "../../../../src/hooks/outboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";
import MessageToast from "../../../../src/components/message-toast/MessageToast";
import NotificationModal from "../../../../src/components/modals/NotificationModal";
const tableHeaders = ["Date", "Document No.", ""];
const tableVisibleProps = ["trndte", "docnum"];

const SinglePick = () => {
  const {
    handleScroll,
    isPaginating,
    isScanModal,
    isSelectModal,
    onRefresh,
    refreshing,
    selectedDocument,
    activeIndex,
    handleIndexChange,
    singlepick,
    status,
    singlepickDetails,
    isNotificationModal,
  } = useOutboundHooks({
    page: "singlepick",
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
            tableData={singlepick.pkValidate.data}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
            selectType="singlepick"
            buttonUses=""
          />
        );
      case 1:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={singlepick.invPosting.data}
            visibleProperties={tableVisibleProps}
            isSelectDisable={true}
            onPost={handlePost}
            buttonUses=""
            postType="inv-singlepick"
          />
        );
      case 2:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={singlepick.stgValidate.data}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
            selectType="stg-validate"
            buttonUses=""
          />
        );
      case 3:
        return (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={singlepick.splPosting.data}
            visibleProperties={tableVisibleProps}
            isSelectDisable={true}
            onPost={handlePost}
            buttonUses=""
            postType="spl-singlepick"
          />
        );
    }
  };

  console.log("single pick");

  return (
    <>
      {status === "success" && !isSelectModal && !isScanModal && (
        <MessageToast
          status="success"
          text="Document Successfully Posted"
          speed={2500}
        />
      )}

      {/* {isNotificationModal && <NotificationModal />} */}

      <View style={generalStyles.outerContainer}>
        <CustomButton
          title="SCAN SINGLE PICK"
          onPress={handleScanModal}
          type="regular"
        />
        {status === "loading" && !isSelectModal && !isScanModal && (
          <CustomLoadingText text="Posting..." visible={true} />
        )}

        <SwitchButton
          options={[
            "PK VALIDATE",
            "INV POSTING",
            "STG VALIDATE",
            "SPL POSTING",
          ]}
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

          {isScanModal && (
            <ScanModal
              visible={isScanModal}
              onClose={handleScanModal}
              placeholder="Waiting to Scan Single Pick Barcode..."
              scanParams={"spl"}
              typeForFetching="singlepick"
              usage="searching"
            />
          )}

          {isSelectModal && (
            <SelectModal
              loadingStatus={singlepickDetails.status === "loading" && true}
              visible={isSelectModal}
              onClose={closeSelectModal}
              selectedItem={selectedDocument}
              title="Single Pick List Details"
              propertiesToShow={[
                {
                  name: "docnum",
                  label:
                    activeIndex === 0 || activeIndex === null
                      ? "TO Number"
                      : "SP TO NO. ",
                },
              ]}
              customContent={
                activeIndex === null || activeIndex === 0 ? (
                  <ItemsList uses="outbound" subcategory={"singlepick"} />
                ) : (
                  <ItemsList uses="outbound" subcategory={"stg-validate"} />
                )
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

export default SinglePick;
