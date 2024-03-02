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
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {generalStyles} from "../../../../src/styles/styles";
import SelectModal from "../../../../src/components/modals/SelectModal";
import ItemsList from "../../../../src/components/list-holder/ItemsList";
import SwitchButton from "../../../../src/components/forms/buttons/SwitchButton";
import {useOutboundHooks} from "../../../../src/hooks/outboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";

const tableHeaders = ["Date", "Document No.", ""];
const tableVisibleProps = ["createdte", "docnum"];

const WavePick = () => {
  const {
    handleScroll,
    isPaginating,
    isScanModal,
    isSelectModal,
    onRefresh,
    refreshing,
    selectedDocument,
    wavepick,
    activeIndex,
    handleIndexChange,
  } = useOutboundHooks({
    page: "wavepick",
  });

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
    useDocumentHooks();

  console.log("wave pick");

  return (
    <View style={generalStyles.outerContainer}>
      <CustomButton
        title="SCAN WAVE PICK"
        onPress={handleScanModal}
        type="regular"
      />
      <SwitchButton
        options={["FOR VALIDATION", "FOR POSTING"]}
        activeIndex={!activeIndex ? 0 : activeIndex}
        onChange={handleIndexChange}
      />

      <ScrollView
        style={generalStyles.innerContainer}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={150}
      >
        {activeIndex === 0 || activeIndex === null ? (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={wavepick.validation.data}
            visibleProperties={tableVisibleProps}
            isPostDisable={true}
            onSelect={handleSelectModal}
            selectType="wavepick"
          />
        ) : (
          <CustomTable
            tableHeaders={tableHeaders}
            tableData={wavepick.forPosting.data}
            visibleProperties={tableVisibleProps}
            isSelectDisable={true}
            onPost={handlePost}
          />
        )}

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={handleScanModal}
            placeholder="Waiting to Scan Wave Pick Barcode..."
            scanParams={{category: "wpto"}}
          />
        )}

        {isSelectModal && (
          <SelectModal
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="Wave Pick List Details"
            propertiesToShow={[{name: "docnum", label: "TO Number"}]}
            customContent={<ItemsList uses="outbound" subcategory="wavepick" />}
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
  );
};

export default WavePick;
