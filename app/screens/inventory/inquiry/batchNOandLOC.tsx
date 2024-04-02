import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { format, generalStyles } from "../../../../src/styles/styles";
import ReactPaperTable from "../../../../src/components/forms/table/ReactPaperTable";
import InputWithSearch from "../../../../src/components/forms/inputs/InputWithSearch";
import { useDocumentHooks } from "../../../../src/hooks/documentHooks";
import { useAppDispatch, useAppSelector } from "../../../../src/store/store";
import SearchModal from "../../../../src/components/modals/SearchModal";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomCheckBox from "../../../../src/components/forms/inputs/CustomCheckBox";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAPIHooks } from "../../../../src/hooks/apiHooks";
import SelectModal from "../../../../src/components/modals/SelectModal";
import { handleToggleSelectModal } from "../../../../src/reducers/modalReducer";
import { resetStatus, setStatus } from "../../../../src/reducers/statusReducer";
import BinInquiryList from "../../../../src/components/modals/BinInquiryDetailsModal";
import CustomLoadingText from "../../../../src/components/load-spinner/CustomLoadingText";

const tableHeaders = ["BIN No.", "Item", "Batch No.", "Exp. Date", "Onhand"];
const tableVisibleProps = ["binnum", "itmcde", "batchnum", "expdte", "binbal"];

const BatchNOandLOC = () => {
  const { isSearchModal } = useAppSelector((state) => state.modal);
  const { status } = useAppSelector((state) => state.status);
  const { binNoText, itemText, warehouseText } = useAppSelector(
    (state) => state.search
  );
  const { isSelectModal } = useAppSelector((state) => state.modal);

  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [toggleSearch, setToggleSearch] = useState<boolean>(true);

  const { getBatchAndBinInquiry, getStockOnHand } = useAPIHooks();
  const { handleSearchModal, closeSelectModal } = useDocumentHooks();
  const dispatch = useAppDispatch();

  const [tableData, setTableData] = useState<any>([]);
  const [modalData, setModalData] = useState<any>();
  const [stockData, setStockData] = useState<any>();

  console.log("batch no. and location");

  const handleSubmit = async () => {
    let filter: string = "";
    if (warehouseText?.warcde) {
      filter += `warcde=${warehouseText?.warcde}`;
      filter += `&warcdenum=${warehouseText?.warcdenum}`;
      filter += `&warloccde=${warehouseText?.warloccde}`;
    }

    if (binNoText) {
      filter += filter ? "&" : "";
      filter += `binnum=${binNoText}`;
    }

    if (itemText) {
      filter += filter ? "&" : "";
      filter += `itmcde=${itemText}`;
    }

    if (showBalance) {
      filter += filter ? "&" : "";
      filter += `binbal=gt:0`;
    }

    dispatch(setStatus("loading"));
    const response: any = await getBatchAndBinInquiry(filter);
    if (response) {
      setTableData(response);
    }
  };

  const getStockData = async (data: any) => {
    dispatch(setStatus("loading"));
    const response = await getStockOnHand({
      warcde: data.warcde,
      warcdenum: data.warcdenum,
      warloccde: data.warloccde,
      binnum: data.binnum,
      itmcde: data.itmcde,
      batchnum: data.batchnum,
      mfgdte: data.mfgdte,
      expdte: data.expdte,
    });
    if (response) {
      setStockData(response);
    }
  };

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const handleToggleSearch = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300, // shorter duration
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setToggleSearch(!toggleSearch);
  };

  if (isSearchModal) {
    return <SearchModal visible={isSearchModal} />;
  }

  const styles = StyleSheet.create({
    searchContainer: {
      padding: 10,
      borderWidth: 1,
      gap: 5,
      borderRadius: 10,
      backgroundColor: "#fff",
      height: toggleSearch ? "auto" : 0,
      overflow: "hidden",
    },
    toggleBtn: {
      position: "absolute",
      bottom: 0,
      left: 0,
      zIndex: 10,
      justifyContent: "center",
      alignItems: "center",
      width: "106%",
      backgroundColor: "#ccc",
    },
  });

  return (
    <>
      <View style={generalStyles.innerContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={handleToggleSearch}
          >
            {toggleSearch ? (
              <FontAwesome5 name="chevron-up" size={20} color="black" />
            ) : (
              <FontAwesome5 name="chevron-down" size={20} color="black" />
            )}
          </TouchableOpacity>
          <InputWithSearch
            label="Warehouse"
            text={warehouseText?.warcde || ""}
            disable={true}
            onShow={() => handleSearchModal("warehouse")}
          />
          <View style={{ gap: 10 }}>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Warehouse No.:</Text>
              <Text>{warehouseText?.warcdenum || ""}</Text>
            </View>
            <View style={format.twoRowText}>
              <Text style={{ fontWeight: "bold" }}>Storage Location:</Text>
              <Text>{warehouseText?.warloccde || ""}</Text>
            </View>
          </View>
          <InputWithSearch
            label="Bin No."
            text={binNoText}
            onShow={() => handleSearchModal("bin")}
            disable={true}
          />
          <InputWithSearch
            label="Item"
            text={itemText}
            onShow={() => handleSearchModal("item")}
            disable={true}
          />
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <CustomButton
              onPress={() => handleSubmit()}
              title="Filter"
              type="save"
              useFlex={true}
            />
            <CustomCheckBox
              isChecked={showBalance}
              label="Show With Balance Only"
              onToggle={() => setShowBalance(!showBalance)}
            />
          </View>
        </View>

        {status === "loading" && (
          <CustomLoadingText text="Processing..." visible={true} />
        )}

        <ReactPaperTable
          tableHeaders={tableHeaders}
          tableData={tableData}
          visibleProperties={tableVisibleProps}
          disableActions={true}
          onSelectRow={(item) => {
            setModalData(item);
            dispatch(handleToggleSelectModal());
            dispatch(resetStatus());
            getStockData(item);
          }}
        />

        {isSelectModal && (
          <SelectModal
            visible={isSelectModal}
            onClose={closeSelectModal}
            selectedItem={modalData}
            title="BIN Inquiry Details"
            loadingStatus={status === "loading" && true}
            propertiesToShow={[
              { name: "header", label: "Sample Company" },
              { name: "header1", label: "Stock Movement By BIN" },
              { name: "warcde", label: "Warehouse" },
              { name: "warcdenum", label: "Whs. No." },
              { name: "warloccde", label: "S.Loc" },
              { name: "binnum", label: "BIN No." },
              { name: "itmdsc", label: "Item Description" },
              { name: "batchnum", label: "Batch No." },
              { name: "mfgdte", label: "Mfg. Date" },
              { name: "expdte", label: "Exp. Date" },
            ]}
            customContent={<BinInquiryList data={stockData} />}
          />
        )}
      </View>
    </>
  );
};

export default BatchNOandLOC;
