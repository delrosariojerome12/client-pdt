import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {useAppSelector} from "../../store/store";
import PTOItems from "../inbound/PTODetails";
import WTODetails from "../outbound/wtoDetails";
import SubConBinDetails from "../inventory-management/subConBinDetails";
import StockTransferDetails from "../stockTransfer/stockTransferDetails";
import PhysicalInventoryDetails from "../physical-inventory/physicalInventoryDetails";

interface Props {
  uses:
    | "inbound"
    | "outbound"
    | "subcon"
    | "stockTransfer"
    | "physicalInventory";
  subcategory?: "srto" | "pto";
  options?: {
    removeEdit?: boolean;
    removeDelete?: boolean;
    removeLpn?: boolean;
  };
}

const ItemsList = React.memo((props: Props) => {
  const {uses, subcategory, options} = props;
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {ptoDetails, srtoDetails} = useAppSelector((state) => state.inbound);

  const renderItems = (item: any, index: number) => {
    switch (uses) {
      case "inbound":
        return <PTOItems item={item} key={index} options={options} />;
      case "outbound":
        return <WTODetails item={item} key={index} />;
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

  const renderView = () => {
    switch (uses) {
      case "inbound":
        switch (subcategory) {
          case "pto":
            return ptoDetails.data.map((item: any, index: number) => {
              return renderItems(item, index);
            });
          case "srto":
            return srtoDetails.data.map((item: any, index: number) => {
              return renderItems(item, index);
            });
        }
    }
  };

  if (selectedDocument) {
    return <View style={styles.container}>{renderView()}</View>;
  }
});

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10,
  },
});

export default ItemsList;
