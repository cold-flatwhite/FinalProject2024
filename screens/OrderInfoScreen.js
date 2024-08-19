import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { database, auth } from "../firebase/firebaseSetups";
import { deleteFromDb } from "../firebase/firebaseHelpers";
import * as Notifications from "expo-notifications";
import { scheduleOrderNotifications } from "../components/NotificationManager";

export default function OrderInfoScreen({ route, navigation }) {
  const { order } = route.params;
  const currentUserID = auth.currentUser.uid;

  // Determine if the current user is the provider for the order
  const isProvider = order.provider_id === currentUserID;

  // State to track the switch state
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  // Function to handle switch toggle
  const toggleSwitch = () => {
    Alert.alert(
      "Notification Permission",
      "Do you allow this app to send notifications?",
      [
        {
          text: "Don't Allow",
          onPress: () => {
            // Do not change the switch state
            setIsSwitchEnabled(false);
          },
          style: "cancel",
        },
        {
          text: "Allow",
          onPress: async () => {
            const newValue = !isSwitchEnabled;

            if (newValue) {
              // When switch is enabled, request notification permissions and schedule notifications
              const hasPermission = await verifyAndScheduleNotification();
              if (hasPermission) {
                setIsSwitchEnabled(true);
              } else {
                Alert.alert("Permission Required", "You must allow notifications to enable this feature.");
                setIsSwitchEnabled(false);
              }
            } else {
              setIsSwitchEnabled(false);
            }
          },
        },
      ]
    );
  };

  // Function to request notification permission and schedule notifications
  const verifyAndScheduleNotification = async () => {
    const hasPermission = await Notifications.requestPermissionsAsync();
    if (hasPermission.status === "granted") {
      await scheduleOrderNotifications(new Date(order.date));
      return true;
    }
    return false;
  };

  // Function to handle order confirmation
  const handleConfirm = async () => {
    try {
      await updateDoc(doc(database, "orders", order.id), {
        status: "Accepted",
      });
      Alert.alert("Success", "Order has been marked as Accepted");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  // Function to handle order rejection
  const handleReject = async () => {
    try {
      await updateDoc(doc(database, "orders", order.id), {
        status: "Rejected",
      });
      Alert.alert("Success", "Order has been rejected");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  // Function to handle order cancellation
  const handleCancel = async () => {
    try {
      await deleteFromDb(order.id, "orders");
      Alert.alert("Success", "Order has been cancelled");
      navigation.goBack();
    } catch (error) {
      console.error("Error cancelling order: ", error);
    }
  };

  // Function to render status message based on order status
  const renderStatusMessage = () => {
    if (order.status === "Accepted") {
      return <Text style={styles.statusMessage}>Order has been Accepted.</Text>;
    } else if (order.status === "Rejected") {
      return <Text style={styles.statusMessage}>Order has been rejected.</Text>;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Order number: {order.id}</Text>
      {isProvider ? (
        <>
          <Text style={styles.info}>
            Client Name: {order.userData?.name || "N/A"}
          </Text>
          <Text style={styles.info}>
            Client Address: {order.userData?.addressDisplay}
          </Text>
          <Text style={styles.info}>
            Client Email: {order.userData?.email || "N/A"}
          </Text>
          <Text style={styles.info}>Request Service: {order.request}</Text>
          <Text style={styles.info}>
            Request Service Date: {new Date(order.date).toLocaleDateString()}
          </Text>
          {/* New Section for Setting Reminders */}
          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>Set Reminders for this order Today and Order Start Day</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isSwitchEnabled}
            />
          </View>
          {order.status === "Pending" ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={handleReject}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          ) : (
            renderStatusMessage()
          )}
        </>
      ) : (
        <>
          <Text style={styles.info}>
            Provider Name: {order.providerData?.name || "N/A"}
          </Text>
          <Text style={styles.info}>
            Provider Address: {order.providerData?.address}
          </Text>
          <Text style={styles.info}>
            Provider Email: {order.providerData?.email || "N/A"}
          </Text>
          <Text style={styles.info}>Request Service: {order.request}</Text>
          <Text style={styles.info}>
            Request Service Date: {new Date(order.date).toLocaleDateString()}
          </Text>
          <Text style={styles.info}>Order Status: {order.status}</Text>
          {order.status === "Pending" && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  rejectButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statusMessage: {
    fontSize: 16,
    marginTop: 20,
    color: "gray",
  },
  // New styles for reminders
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  reminderText: {
    fontSize: 16,
    flex: 1,
  },
});
