import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import CustomButton from "../../forms/buttons/CustomButton";
import {formatDateStringMMDDYYYY} from "../../../helper/Date";
interface VerticalItemProps {
  item: any;
  propertyLabels: {name: string; label: string}[];
  onValidate: () => void;
  onSelect: () => void;
}

const VerticalItem: React.FC<VerticalItemProps> = ({
  item,
  propertyLabels,
  onValidate,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <View>
        {propertyLabels.map(({name, label}, index) => {
          return (
            <View key={index} style={styles.propertyRow}>
              <Text style={styles.label}>{label}: </Text>
              {name.includes("dte") ? (
                <Text>{formatDateStringMMDDYYYY(item[name])}</Text>
              ) : (
                <Text>{item[name]}</Text>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="SELECT"
          onPress={onSelect}
          type="regular"
          fontSize={12}
        />

        <CustomButton
          title="VALIDATE"
          onPress={onValidate}
          type="save"
          fontSize={12}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 10,
  },
  propertyRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VerticalItem;
