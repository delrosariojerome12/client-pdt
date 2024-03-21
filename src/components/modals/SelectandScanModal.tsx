import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {shadows} from "../../styles/styles";
import CustomButton from "../forms/buttons/CustomButton";
import {useAppSelector} from "../../store/store";
import CustomCheckBox from "../forms/inputs/CustomCheckBox";
import ScanModal from "./ScanModal";
import MessageToast from "../message-toast/MessageToast";
import CustomLoadingText from "../load-spinner/CustomLoadingText";
import {useBatchHooks} from "../../hooks/batchHooks";
import {useModalHooks} from "../../hooks/modalHooks";
import ScanBinAndItemModal from "./ScanBinAndItemModal";

interface SelectScanModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: any;
  title: string;
  propertiesToShow: {name: string; label: string}[];
  customContent: JSX.Element;
  scanOptions?: {
    scanModal: boolean;
    scanModalDetails?: {title: string; placeholder: string};
  };
  loadingStatus?: boolean;
}

const SelectandScanModal = React.memo((props: SelectScanModalProps) => {
  const {
    visible,
    onClose,
    selectedItem,
    title,
    propertiesToShow,
    customContent,
    scanOptions,
    loadingStatus,
  } = props;
  const {status, statusText} = useAppSelector((state) => state.status);

  const {cycleCountDetails} = useAppSelector(
    (state) => state.inventoryTransaction
  );

  const {handleCheckPendingScan} = useBatchHooks();
  const {toggleScanBinModal, isScanBinModal} = useModalHooks();

  const [isShowPending, setIsShowPending] = useState<boolean>(true);
  const [isShowScanned, setIsShowScanned] = useState<boolean>(true);

  if (selectedItem) {
    return (
      <Modal visible={visible} onRequestClose={onClose} transparent>
        {status === "success" && (
          <MessageToast
            status="success"
            text={statusText}
            speed={2500}
            customPosition={[-150, -10]}
          />
        )}

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {status === "loading" && (
              <CustomLoadingText text="Processing..." visible={true} />
            )}
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={onClose}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{title}</Text>
            </View>

            <CustomButton
              title={"SCAN BIN NO. / ITEM"}
              onPress={() => toggleScanBinModal(selectedItem)}
              type="regular"
            />

            {isScanBinModal && (
              <ScanBinAndItemModal
                onClose={() => {
                  toggleScanBinModal();
                }}
                placeholder="Waiting to Scan Bin No. Barcode..."
                visible={isScanBinModal}
                scanParams="cc_item"
                typeForFetching="cyclecount"
              />
            )}

            {loadingStatus ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <View style={[shadows.boxShadow, styles.propertiesContainer]}>
                  {propertiesToShow.map((propertyObj) => (
                    <View key={propertyObj.name} style={styles.properties}>
                      <Text style={styles.label}>{propertyObj.label}: </Text>
                      <Text>{selectedItem[propertyObj.name]}</Text>
                    </View>
                  ))}
                  <View style={styles.properties}>
                    <Text style={styles.label}>Scanned/Counted: </Text>
                    <Text>{`${cycleCountDetails.data.totalscanned}/${cycleCountDetails.data.totalItem}`}</Text>
                  </View>

                  <View style={{flexDirection: "row"}}>
                    <CustomCheckBox
                      label="Show Pending"
                      isChecked={isShowPending}
                      onToggle={() => {
                        handleCheckPendingScan(!isShowPending, isShowScanned);
                        setIsShowPending(!isShowPending);
                      }}
                    />
                    <CustomCheckBox
                      label="Show Scanned"
                      isChecked={isShowScanned}
                      onToggle={() => {
                        handleCheckPendingScan(isShowPending, !isShowScanned);
                        setIsShowScanned(!isShowScanned);
                      }}
                    />
                  </View>
                </View>

                <ScrollView style={styles.customContainer}>
                  {customContent}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  }
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    // borderRadius: 10,
    height: "100%",
    width: "100%",
    gap: 10,
  },
  topContainer: {
    gap: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
  },
  continueBtn: {
    width: "60%",
  },
  closeBtn: {
    width: "40%",
  },
  headerContainer: {
    flexDirection: "row",
    gap: 20,
  },
  propertiesContainer: {
    padding: 20,
  },
  customContainer: {
    // borderWidth: 1,
    width: "100%",
  },
  properties: {
    flexDirection: "row",
    gap: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
  },
});

export default SelectandScanModal;
