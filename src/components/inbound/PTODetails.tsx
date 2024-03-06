import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import CustomButton from "../forms/buttons/CustomButton";
import {bgColors} from "../../styles/styles";
import {useDocumentHooks} from "../../hooks/documentHooks";
import {useAppSelector} from "../../store/store";
import {format} from "../../styles/styles";
import {ProductData} from "../../models/generic/ProductData";
import ItemScanModal from "../modals/ItemScanModal";
import AddBatchModal from "../modals/AddBatchModal";
import EditBatchModal from "../modals/EditBatchModal";
import {useBatchHooks} from "../../hooks/batchHooks";

interface Items {
  item: ProductData;
  options?: {
    removeEdit?: boolean;
    removeDelete?: boolean;
    removeLpn?: boolean;
  };
}
const PTOItems = React.memo((props: Items) => {
  const {isScanItemModal, isAddBatchModal, isEditBatchModal} = useAppSelector(
    (state) => state.modal
  );
  const {handleItemScanModal, closeItemScanModal, removeScannedQuantity} =
    useDocumentHooks();
  const {
    handleAddBatchModal,
    handleCloseAddBatchModal,
    handleEditBatchModal,
    handleCloseEditBatchModal,
    batchNo,
    expDate,
    mfgDate,
    handleBatchNo,
    handleExpDate,
    handleMfgDate,
    handleSave,
  } = useBatchHooks({uses: "update"});
  const {item, options} = props;

  if (isAddBatchModal) {
    return (
      <AddBatchModal
        visible={isAddBatchModal}
        onClose={handleCloseAddBatchModal}
      />
    );
  }

  if (isEditBatchModal) {
    return (
      <EditBatchModal
        isEmpty={false}
        onClose={handleCloseEditBatchModal}
        visible={isEditBatchModal}
        onSave={handleSave}
        batchData={{
          batchNo,
          mfgDate,
          expDate,
          handleBatchNo,
          handleExpDate,
          handleMfgDate,
        }}
      />
    );
  }

  return (
    <>
      <View style={[styles.container, bgColors.mediumGrayishBG]}>
        <View style={styles.leftContainer}>
          <Text>{item.itmcde}</Text>
          <Text>{item.itmdsc}</Text>
          <Text>{`${item.intqty} PCS`}</Text>
          <View style={styles.remove}>
            <Text>{`Received Qty: ${item.itmqty}`}</Text>
            {!options?.removeDelete && (
              <TouchableOpacity
                onPress={() => {
                  removeScannedQuantity(item);
                }}
              >
                <FontAwesome name="remove" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <CustomButton
            onPress={() => handleItemScanModal(item)}
            title="SCAN ITEM"
            type="regular"
            isWidthNotFull={true}
            fontSize={12}
          />
        </View>
        <View style={styles.rightContainer}>
          {/* if validated */}
          {/* <Text style={{fontWeight: "bold"}}>**VALIDATED**</Text> */}
          {!options?.removeLpn && (
            <View style={{flexDirection: "row", gap: 5}}>
              <Text style={{fontWeight: "bold"}}>LPN: </Text>
              <Text>{`${item.lpnnum}`}</Text>
            </View>
          )}

          <View style={styles.datesContainer}>
            <View style={{flexWrap: "wrap", width: "80%"}}>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Batch No.:</Text>
                <Text>{` ${item.batchnum || "No BatchNo."}`}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Mfg. Date:</Text>
                <Text>{` ${item.mfgdte || "No Date"} `}</Text>
              </View>
              <View style={format.twoRowText}>
                <Text style={{fontWeight: "bold"}}>Exp. Date:</Text>
                <Text>{` ${item.expdte || "No Date"}`}</Text>
              </View>
            </View>
            {!options?.removeEdit && (
              <TouchableOpacity onPress={() => handleEditBatchModal(item)}>
                <FontAwesome name="edit" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>

          <CustomButton
            onPress={() => handleAddBatchModal(item)}
            title="ADD ANOTHER BATCHING"
            type="regular"
            isWidthNotFull={true}
            fontSize={12}
          />
        </View>
      </View>
      {isScanItemModal && (
        <ItemScanModal
          visible={isScanItemModal}
          onClose={closeItemScanModal}
          scanParams={{category: "bnt_item"}}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 100 / 10,
    gap: 10,
  },
  leftContainer: {
    gap: 10,
    width: "45%",
  },
  remove: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  rightContainer: {
    gap: 10,
    alignItems: "flex-end",
    width: "55%",
    // borderWidth: 1,
  },
  datesContainer: {
    borderWidth: 1,
    width: "100%",
    padding: 5,
    borderRadius: 50 / 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default PTOItems;
