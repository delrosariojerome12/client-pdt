import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import React, {useState} from "react";
import {format, generalStyles} from "../../../../src/styles/styles";
import ReactPaperTable from "../../../../src/components/forms/table/ReactPaperTable";
import InputWithSearch from "../../../../src/components/forms/inputs/InputWithSearch";
import {useDocumentHooks} from "../../../../src/hooks/documentHooks";
import {useAppSelector} from "../../../../src/store/store";
import SearchModal from "../../../../src/components/modals/SearchModal";
import CustomButton from "../../../../src/components/forms/buttons/CustomButton";
import CustomCheckBox from "../../../../src/components/forms/inputs/CustomCheckBox";
import {useSearchHooks} from "../../../../src/hooks/searchHooks";
import {FontAwesome5} from "@expo/vector-icons";

const tableData: any = [];
const tableHeaders = ["BIN No.", "Item", "Batch No.", "Exp. Date", "Onhand"];
const tableVisibleProps = [
  "binNumber",
  "itemName",
  "batchNumber",
  "expDate",
  "pieces",
];
const BatchNOandLOC = () => {
  const {isSearchModal} = useAppSelector((state) => state.modal);
  const {binNoText, itemText, warehouse} = useAppSelector(
    (state) => state.search
  );

  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const {handleFilterItems} = useSearchHooks();
  const {handleSearchModal} = useDocumentHooks();

  console.log("batch no. and location");

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
    <View style={generalStyles.innerContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.toggleBtn} onPress={handleToggleSearch}>
          {toggleSearch ? (
            <FontAwesome5 name="chevron-up" size={20} color="black" />
          ) : (
            <FontAwesome5 name="chevron-down" size={20} color="black" />
          )}
        </TouchableOpacity>
        <InputWithSearch
          label="Warehouse"
          text={warehouse?.warehouse || ""}
          disable={true}
          onShow={() => handleSearchModal({content: "warehouse"})}
        />
        <View style={{gap: 10}}>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Warehouse No.:</Text>
            <Text>{warehouse?.whsNo || ""}</Text>
          </View>
          <View style={format.twoRowText}>
            <Text style={{fontWeight: "bold"}}>Storage Location:</Text>
            <Text>{warehouse?.sLoc || ""}</Text>
          </View>
        </View>
        <InputWithSearch
          label="Bin No."
          text={binNoText}
          onShow={() => handleSearchModal({content: "bin"})}
          disable={true}
        />
        <InputWithSearch
          label="Item"
          text={itemText}
          onShow={() => handleSearchModal({content: "item"})}
          disable={true}
        />
        <View style={{flexDirection: "row", marginBottom: 20}}>
          <CustomButton
            onPress={() => handleFilterItems("PASS params here")}
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

      <ReactPaperTable
        tableHeaders={tableHeaders}
        tableData={tableData}
        visibleProperties={tableVisibleProps}
        disableActions={true}
      />
    </View>
  );
};

export default BatchNOandLOC;
