import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../forms/buttons/CustomButton";
import { bgColors } from "../../styles/styles";
import { format } from "../../styles/styles";
import { Options } from "../list-holder/ItemsList";
import { SLOCDetails } from "../../models/ims/SLOC";
import { useBatchHooks } from "../../hooks/batchHooks";
import { useModalHooks } from "../../hooks/modalHooks";

interface Items {
  item: SLOCDetails;
  options: Options;
}

const StockTransferDetails = React.memo((props: Items) => {
  const { item, options } = props;
  const { toggleSourceScanning, toggleTargetScanning } = useModalHooks();
  const { removeScannedQuantity } = useBatchHooks();

  console.log("stock tansfer details");

  return (
    <>
      <View style={[styles.container, bgColors.mediumGrayishBG]}>
        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>{`Line No:`}</Text>
              <Text>{item.linenum}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Item Code:</Text>
              <Text>{`${item.itmcde}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Description:</Text>
              <Text>{`${item.itmdsc}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Source Bin No.:</Text>
              <Text>{`${item.binnum}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Qty:</Text>
              <Text>{`${item.itmqty}`}</Text>
            </View>
            <View style={styles.remove}>
              <View style={format.twoRowText}>
                <Text style={{ fontWeight: "bold" }}>Scanned Qty:</Text>
                <Text>{`${item.scanqty}`}</Text>
              </View>
              <TouchableOpacity
                disabled={item.validate === 1 ? true : false}
                style={item.validate === 1 ? { opacity: 0.5 } : {}}
                onPress={() => {
                  removeScannedQuantity(item, "sloc");
                }}
              >
                <FontAwesome name="remove" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rightContainer}>
            {item.validate === 1 && (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                **VALIDATED**
              </Text>
            )}
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Batch No.:</Text>
              <Text>{`${item.batchnum || ""}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Mfg. Date:</Text>
              <Text>{`${item.mfgdte || ""}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Exp. Date:</Text>
              <Text>{`${item.expdte || ""}`}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Target Bin No.:</Text>
              <Text>{`${item.binnum2 || ""}`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <CustomButton
            onPress={() => toggleSourceScanning(item)}
            title="SOURCE SCANNING"
            type="regular"
            isWidthNotFull={true}
            fontSize={12}
            isDisable={
              item.validate === 1 ? true : item.sourcescan ? false : true
            }
          />
          <CustomButton
            onPress={() => toggleTargetScanning(item)}
            title="TARGET SCANNING"
            type="regular"
            isWidthNotFull={true}
            fontSize={12}
            isDisable={
              item.validate === 1 ? true : item.targetscan ? false : true
            }
          />
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
    gap: 10,
    flex: 1,
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

export default StockTransferDetails;
