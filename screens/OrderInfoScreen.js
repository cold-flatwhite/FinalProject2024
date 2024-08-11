import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { database, auth } from "../firebase/firebaseSetups";
import { deleteFromDb } from "../firebase/firebaseHelpers";

// Component to handle and display information for an individual order
export default function OrderInfoScreen({ route, navigation }) {
  const { order } = route.params;
  const currentUserID = auth.currentUser.uid;

  // Determine if the current user is the provider for the order
  const isProvider = order.provider_id === currentUserID;

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
      {/* Conditional rendering based on whether the current user is the provider */}
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
          {/* Display provider details if the current user is not the provider */}
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
});
