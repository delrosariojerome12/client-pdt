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
}

const ItemsList = (props: Props) => {
  const {uses} = props;
  const {selectedDocument} = useAppSelector((state) => state.document);
  const {ptoDetails} = useAppSelector((state) => state.inbound);

  const renderItems = (item: any, index: number) => {
    switch (uses) {
      case "inbound":
        return <PTOItems item={item} key={index} />;
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

  console.log(ptoDetails);

  const renderView = () => {
    switch (uses) {
      case "inbound":
        return ptoDetails.data.map((item: any, index: number) => {
          return renderItems(item, index);
        });
      default:
        break;
    }
  };

  if (selectedDocument) {
    return <View style={styles.container}>{renderView()}</View>;
  }
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingBottom: 10,
  },
});

export default ItemsList;
