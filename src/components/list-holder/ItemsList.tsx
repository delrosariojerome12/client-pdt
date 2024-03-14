import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {useAppSelector} from "../../store/store";
import PTODetails from "../inbound/PTODetails";
import WTODetails from "../outbound/wtoDetails";
import SubConBinDetails from "../inventory-management/subConBinDetails";
import StockTransferDetails from "../stockTransfer/stockTransferDetails";
import PhysicalInventoryDetails from "../physical-inventory/physicalInventoryDetails";
import STGDetails from "../outbound/stgDetails";
import AddBatchModal from "../modals/AddBatchModal";
import EditBatchModal from "../modals/EditBatchModal";
import ItemScanModal from "../modals/ItemScanModal";
import OutboundItemScanModal from "../modals/outbound/OutboundItemScanModal";
import {TypeSelect} from "../../hooks/documentHooks";

export type Options = {
  removeEdit?: boolean;
  removeDelete?: boolean;
  removeLpn?: boolean;
  removeScanBatch?: boolean;
  receivedQty?: "intqty" | "itmqty";
  removeType: TypeSelect;
};

export type ScanOptions = {
  receivedQty?: "intqty" | "itmqty";
};

interface Props {
  uses:
    | "inbound"
    | "outbound"
    | "subcon"
    | "stockTransfer"
    | "physicalInventory"
    | "stgDetails";
  subcategory:
    | "pto"
    | "wto-inbound"
    | "srto"
    | "wto-outbound"
    | "wavepick"
    | "stg-validate";
}

const ItemsList = React.memo((props: Props) => {
  const {
    isScanItemModal,
    isAddBatchModal,
    isEditBatchModal,
    isOutboundItemScan,
  } = useAppSelector((state) => state.modal);

  const {uses, subcategory} = props;
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {ptoDetails, srtoDetails, wtoDetails} = useAppSelector(
    (state) => state.inbound
  );
  const {wtoOutboundDetails, wavepickDetails, stgDetails} = useAppSelector(
    (state) => state.outbound
  );
  const renderItems = (item: any, index: number, options: Options) => {
    switch (uses) {
      case "inbound":
        return <PTODetails item={item} key={index} options={options} />;
      case "outbound":
        return <WTODetails item={item} key={index} options={options} />;
      case "stgDetails":
        return <STGDetails item={item} key={index} />;
      case "subcon":
        return <SubConBinDetails item={item} key={index} />;
      case "stockTransfer":
        return <StockTransferDetails item={item} key={index} />;
      case "physicalInventory":
        return <PhysicalInventoryDetails item={item} key={index} />;
      default:
        break;
    }
  };

  const checkOptions = (): ScanOptions => {
    switch (subcategory) {
      case "pto":
        return {};
      case "wto-inbound":
        return {receivedQty: "intqty"};

      default:
        return {};
    }
  };

  const renderView = () => {
    switch (uses) {
      case "inbound":
        switch (subcategory) {
          case "pto":
            return ptoDetails.data.map((item: any, index: number) => {
              return renderItems(item, index, {removeType: "pto"});
            });
          case "wto-inbound":
            return wtoDetails.data.map((item: any, index: number) => {
              return renderItems(item, index, {
                removeScanBatch: true,
                removeEdit: true,
                removeLpn: true,
                receivedQty: "intqty",
                removeType: "wto-inbound",
              });
            });
          case "srto":
            return srtoDetails.data.map((item: any, index: number) => {
              return renderItems(item, index, {removeType: "srto"});
            });
        }
      case "outbound":
        switch (subcategory) {
          case "wto-outbound":
            return wtoOutboundDetails.data.map((item: any, index: number) => {
              return renderItems(item, index, {removeType: "wto-outbound"});
            });
          case "wavepick":
            return wavepickDetails.data.map((item: any, index: number) => {
              return renderItems(item, index, {removeType: "wavepick"});
            });
        }
      case "stgDetails":
        return stgDetails.data.map((item: any, index: number) => {
          return renderItems(item, index, {removeType: "stg-validate"});
        });
    }
  };

  const renderModals = () => {
    return (
      <>
        {isAddBatchModal && <AddBatchModal />}
        {isEditBatchModal && <EditBatchModal />}
        {isScanItemModal && (
          <ItemScanModal
            visible={isScanItemModal}
            scanType={subcategory}
            options={checkOptions()}
          />
        )}
        {isOutboundItemScan && (
          <OutboundItemScanModal
            visible={isOutboundItemScan}
            scanType={subcategory}
          />
        )}
      </>
    );
  };

  if (selectedDocument) {
    return (
      <>
        {renderModals()}
        <View style={styles.container}>{renderView()}</View>
      </>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10,
  },
});

export default ItemsList;
