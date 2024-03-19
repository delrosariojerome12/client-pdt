import React from "react";
import {
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import {useAppSelector, useAppDispatch} from "../../store/store";
import {handleToggleNotificationModal} from "../../reducers/modalReducer";
import HTML from "react-native-render-html";

const NotificationModal = React.memo(() => {
  const {isNotificationModal, notificationText} = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isNotificationModal}
      onRequestClose={() => dispatch(handleToggleNotificationModal())}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Notification</Text>
          {/* <Text style={styles.message}>{notificationText}</Text> */}
          <ScrollView
            style={styles.htmlContainer}
            contentContainerStyle={{flexGrow: 1}}
          >
            <HTML
              source={{
                html: notificationText,
              }}
              contentWidth={200}
              baseStyle={{textAlign: "center"}}
            />
          </ScrollView>

          <TouchableOpacity
            onPress={() => dispatch(handleToggleNotificationModal())}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  htmlContainer: {
    height: 300,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NotificationModal;
