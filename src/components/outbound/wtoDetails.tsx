import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import CustomButton from "../forms/buttons/CustomButton";
import {bgColors} from "../../styles/styles";
import {useDocumentHooks} from "../../hooks/documentHooks";
import ItemScanModal from "../modals/ItemScanModal";
import {useAppSelector} from "../../store/store";
import {format} from "../../styles/styles";
import {OutboundItem} from "../../models/warehouse/outbound/wto-outbound-item";
import {useBatchHooks} from "../../hooks/batchHooks";
import {useModalHooks} from "../../hooks/modalHooks";
import {formatDateStringMMDDYYYY} from "../../helper/Date";

interface Items {
  item: OutboundItem;
}
const WTODetails = React.memo((props: Items) => {
  const {toggleOutboundItemScan} = useModalHooks();
  const {removeScannedQuantity} = useBatchHooks();
  const {item} = props;

  console.log(item.itmqty, item.scanqty);
  return (
    <>
      <View style={[styles.container, bgColors.mediumGrayishBG]}>
        <View style={styles.leftContainer}>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>{`Line No:`}</Text>
            <Text>{`${item.linenum}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Item Code:</Text>
            <Text>{`${item.itmcde}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Description:</Text>
            <Text>{`${item.itmdsc}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>UOM:</Text>
            <Text>{`${item.untmea}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Qty:</Text>
            <Text>{`${item.itmqty}`}</Text>
          </View>
          <View style={styles.remove}>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Scanned Qty:</Text>
              <Text>{`${item.scanqty}`}</Text>
            </View>
            <TouchableOpacity
              style={item.itmqty === item.scanqty && {opacity: 0.5}}
              disabled={item.itmqty === item.scanqty ? true : false}
              onPress={() => {
                removeScannedQuantity(item, "wto-outbound");
              }}
            >
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.datesContainer}>
            <View>
              {item.itmqty === item.scanqty && (
                <Text style={{color: "green", fontWeight: "bold"}}>
                  **Validated**
                </Text>
              )}
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
                <Text>{`${item.binnum2} `}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                <Text>{`${item.batchnum}`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                <Text>{`${
                  formatDateStringMMDDYYYY(item.mfgdte as string) || "No Date"
                }`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                <Text>{`${
                  formatDateStringMMDDYYYY(item.expdte as string) || "No Date"
                }`}</Text>
              </View>
            </View>
          </View>
          <CustomButton
            isDisable={item.itmqty === item.scanqty ? true : false}
            onPress={() => toggleOutboundItemScan(item)}
            title="SCAN ITEM"
            type="regular"
            isWidthNotFull={true}
          />
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    padding: 15,
    borderRadius: 100 / 10,
    gap: 5,
  },
  leftContainer: {
    gap: 5,
    // borderWidth: 1,
    width: "50%",
  },
  remove: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  rightContainer: {
    gap: 5,
    alignItems: "flex-end",
    width: "50%",
    height: "100%",
    // justifyContent: "flex-start",
    // borderWidth: 1,
  },
  datesContainer: {
    // alignItems: "flex-start",
    width: "100%",
    padding: 7,
    borderRadius: 50 / 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default WTODetails;
