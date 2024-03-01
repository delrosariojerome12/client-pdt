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
import {useInboundHooks} from "../../../../src/hooks/inboundHooks";
import LoadingSpinner from "../../../../src/components/load-spinner/LoadingSpinner";

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
  } = useInboundHooks({
    page: "srto",
  });

  const {handleScanModal, handleSelectModal, closeSelectModal, handlePost} =
    useDocumentHooks();

  if (srto.status === "loading" && !refreshing && !isPaginating) {
    return <LoadingSpinner />;
  }

  console.log("SRTO");

  return (
    <View style={generalStyles.outerContainer}>
      <CustomButton title="SCAN SRT" onPress={handleScanModal} type="regular" />
      <ScrollView
        style={generalStyles.innerContainer}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={150}
      >
        <CustomTable
          tableHeaders={tableHeaders}
          tableData={srto.data}
          visibleProperties={tableVisibleProps}
          isPostDisable={true}
          onSelect={handleSelectModal}
          selectType="srto"
        />

        {isScanModal && (
          <ScanModal
            visible={isScanModal}
            onClose={handleScanModal}
            placeholder="Waiting to Scan SRT Barcode..."
            scanParams={{category: "lpnnum_srto"}}
          />
        )}

        {isSelectModal && (
          <SelectModal
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={selectedDocument}
            title="Sales Return Transfer Order Details"
            propertiesToShow={[
              {name: "docnum", label: "Document Number"},
              {name: "srtdocnum", label: "SRT Number"},
            ]}
            customContent={
              <ItemsList
                uses="inbound"
                subcategory="srto"
                options={{removeEdit: true, removeLpn: true}}
              />
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
  );
};

export default SRTO;
