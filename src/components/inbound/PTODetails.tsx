import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import CustomButton from "../forms/buttons/CustomButton";
import {bgColors} from "../../styles/styles";
import {useDocumentHooks} from "../../hooks/documentHooks";
import ItemScanModal from "../modals/ItemScanModal";
import {useAppSelector} from "../../store/store";
import {format} from "../../styles/styles";

interface Items {
  item: any;
}
const PTOItems = (props: Items) => {
  const {isScanItemModal} = useAppSelector((state) => state.modal);
  const {handleItemScanModal, closeItemScanModal, removeScannedQuantity} =
    useDocumentHooks();
  const {item} = props;

  return (
    <>
      <View style={[styles.container, bgColors.mediumGrayishBG]}>
        <View style={styles.leftContainer}>
          <Text>{item.itemName}</Text>
          <Text>{item.itemCode}</Text>
          <Text>{`${item.pieces} PCS`}</Text>
          <View style={styles.remove}>
            <Text>{`Receieved Qty: ${item.receiveQty}`}</Text>
            <TouchableOpacity
              onPress={() => {
                removeScannedQuantity(item);
              }}
            >
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightContainer}>
          {/* if validated */}
          {/* <Text style={{fontWeight: "bold"}}>**VALIDATED**</Text> */}
          <View style={{flexDirection: "row", gap: 5}}>
            <Text style={{fontWeight: "bold"}}>LPN: </Text>
            <Text>{`${item.LPNNumber}`}</Text>
          </View>
          <View style={styles.datesContainer}>
            <View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                <Text>{` ${item.batchNumber}`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                <Text>{` ${item.expDate}`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                <Text>{` ${item.mfgDate}`}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CustomButton
            onPress={() => handleItemScanModal(item)}
            title="SCAN ITEM"
            type="regular"
            isWidthNotFull={true}
          />
        </View>
      </View>
      <ItemScanModal visible={isScanItemModal} onClose={closeItemScanModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 100 / 10,
  },
  leftContainer: {
    gap: 5,
    width: "45%",
    // borderWidth: 1,
  },
  remove: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  rightContainer: {
    gap: 5,
    alignItems: "flex-end",
    width: "55%",
    // borderWidth: 1,
  },
  datesContainer: {
    // alignItems: "flex-start",
    borderWidth: 1,
    width: "100%",
    padding: 7,
    borderRadius: 50 / 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default PTOItems;
