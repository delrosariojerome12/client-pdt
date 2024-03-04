import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import CustomButton from "../forms/buttons/CustomButton";
import {bgColors} from "../../styles/styles";
import {useDocumentHooks} from "../../hooks/documentHooks";
import ItemScanModal from "../modals/ItemScanModal";
import {useAppSelector} from "../../store/store";
import {format} from "../../styles/styles";
import {STGDetailsModel} from "../../models/warehouse/outbound/stgDetails";

interface Items {
  item: STGDetailsModel;
}
const STGDetails = (props: Items) => {
  const {isScanItemModal} = useAppSelector((state) => state.modal);
  const {handleItemScanModal, closeItemScanModal, removeScannedQuantity} =
    useDocumentHooks();
  const {item} = props;

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
            <Text>{` ${item.itmcde}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Description:</Text>
            <Text>{` ${item.itmdsc}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>UOM:</Text>
            <Text>{`${item.untmea}`}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Qty:</Text>
            <Text>{` ${item.itmqty}`}</Text>
          </View>
          <View style={styles.remove}>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Scanned Qty:</Text>
              <Text>{` ${item.scanqty}`}</Text>
            </View>
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
          {/* <View style={{flexDirection: "row", gap: 5}}>
            <Text style={{fontWeight: "bold"}}>LPN: </Text>
            <Text>{`${item.lpnnum}`}</Text>
          </View> */}
          <View style={styles.datesContainer}>
            <View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
                <Text>{` ${item.binto} `}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                <Text>{` ${item.batchnum}`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                <Text>{` ${item.mfgdte}`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                <Text>{` ${item.expdte}`}</Text>
              </View>
            </View>
          </View>
          <CustomButton
            onPress={() => handleItemScanModal(item)}
            title="SCAN ITEM"
            type="regular"
            isWidthNotFull={true}
          />
        </View>
      </View>
      {isScanItemModal && (
        <ItemScanModal
          visible={isScanItemModal}
          onClose={closeItemScanModal}
          scanParams={{category: "wrr_wto_outbound"}}
        />
      )}
    </>
  );
};

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

export default STGDetails;
