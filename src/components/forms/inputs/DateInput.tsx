import React, {useState} from "react";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface DateInputProps {
  inputPlaceholder?: string;
  date: Date;
  onChangeDate: (newDate: Date) => void;
  disabled?: boolean;
}

const DateInput: React.FC<DateInputProps> = React.memo(
  ({inputPlaceholder = "Select Date", date, onChangeDate, disabled}) => {
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = () => {
      setShowPicker(!showPicker);
    };

    const handleDateChange = (
      event: DateTimePickerEvent,
      selectedDate: Date | undefined
    ) => {
      console.log("event type:", event.type);

      if (event.type === "set") {
        onChangeDate(selectedDate || date);
        setShowPicker(Platform.OS === "ios");
      } else if (event.type === "dismissed") {
        toggleDatePicker();
      }
    };

    return (
      <View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={toggleDatePicker}
          disabled={true} // Pass disabled prop to Pressable
        >
          <Text style={{fontWeight: "500", opacity: 0.6}}>
            {inputPlaceholder}
          </Text>

          <TextInput
            value={date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            editable={false}
            style={styles.input}
          />
        </Pressable>

        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "gray",
    flex: 1,
  },
});

export default DateInput;
