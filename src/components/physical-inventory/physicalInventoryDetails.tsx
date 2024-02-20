import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import CustomButton from "../forms/buttons/CustomButton";
import {bgColors} from "../../styles/styles";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {useAppSelector} from "../../store/store";
import {format} from "../../styles/styles";
import BinScanModal from "../modals/BinScanModal";
import ScanModal from "../modals/ScanModal";

interface PhysicalInventoryProps {
  item: any;
}

const PhysicalInventoryDetails = (props: PhysicalInventoryProps) => {
  const {isScanItemModal, isScanModal} = useAppSelector((state) => state.modal);
  const {removeScannedQuantity} = useDocumentHooks();
  const {item} = props;

  return (
    <>
      <View style={[styles.container, bgColors.mediumGrayishBG]}>
        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>{`Line No:`}</Text>
              <Text>{`1`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
              <Text>{`1234`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Item Code:</Text>
              <Text>{` ${item.itemCode}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Description:</Text>
              <Text>{` ${item.itemName}`}</Text>
            </View>

            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>U/M:</Text>
              <Text>{`PCS`}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            {/* if validated */}
            {/* <Text style={{fontWeight: "bold"}}>**VALIDATED**</Text> */}
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

            <View style={styles.remove}>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Qty:</Text>
                <Text>{` ${item.receiveQty}`}</Text>
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    borderRadius: 100 / 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flex: 1,
    // borderWidth: 1,
  },
  leftContainer: {
    gap: 5,
    width: "45%",
  },
  rightContainer: {
    width: "50%",
    gap: 5,
  },
  bottomContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remove: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
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

export default PhysicalInventoryDetails;
