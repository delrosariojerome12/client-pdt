import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {bgColors} from "../../styles/styles";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {format} from "../../styles/styles";
import {useBatchHooks} from "../../hooks/batchHooks";
import {formatDateStringMMDDYYYY} from "../../helper/Date";
import {Options} from "../list-holder/ItemsList";

interface PhysicalInventoryProps {
  item: any;
  options: Options;
}

const PhysicalInventoryDetails = React.memo((props: PhysicalInventoryProps) => {
  const {removeScannedQuantity} = useBatchHooks();
  const {item, options} = props;

  return (
    <>
      <View style={[styles.container, bgColors.mediumGrayishBG]}>
        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>{`Line No:`}</Text>
              <Text>{item.linenum}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Bin No.:</Text>
              <Text>{item.binnum}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Item Code:</Text>
              <Text>{item.itmcde}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Description:</Text>
              <Text>{item.itmdsc}</Text>
            </View>

            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>UOM:</Text>
              <Text>{item.untmea}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
              <Text>{item.batchnum || "No Batch No."}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
              <Text>{formatDateStringMMDDYYYY(item.mfgdte)}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
              <Text>{formatDateStringMMDDYYYY(item.expdte)}</Text>
            </View>

            <View style={styles.remove}>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Qty:</Text>
                <Text>{item.itmqty}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  removeScannedQuantity(item, options?.removeType);
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
});

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
