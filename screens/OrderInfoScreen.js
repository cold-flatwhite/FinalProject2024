import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { database, auth } from "../firebase/firebaseSetup";

export default function OrderInfoScreen({ route, navigation }) {
  const { order } = route.params;
  const currentUserID = auth.currentUser.uid;

  // Check if the current user is the provider or the one who posted the order
  const isProvider = order.provider_id === currentUserID;

  const handleConfirm = async () => {
    try {
      await updateDoc(doc(database, "orders", order.id), {
        status: "Complete",
      });
      Alert.alert("Success", "Order has been marked as complete");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

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

  const renderStatusMessage = () => {
    if (order.status === "Complete") {
      return (
        <Text style={styles.statusMessage}>Order has been completed.</Text>
      );
    } else if (order.status === "Rejected") {
      return <Text style={styles.statusMessage}>Order has been rejected.</Text>;
    } else if (order.status === "Incomplete") {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Order number: {order.id}</Text>
      {isProvider ? (
        <>
          <Text style={styles.info}>
            Client: {order.userData?.name || "N/A"}
          </Text>
          <Text style={styles.info}>Address: {order.userData?.address}</Text>
          <Text style={styles.info}>Breed: {order.breed}</Text>
          <Text style={styles.info}>
            Email: {order.userData?.email || "N/A"}
          </Text>
          <Text style={styles.info}>Request: {order.request}</Text>
          <Text style={styles.info}>
            Date: {new Date(order.date).toLocaleDateString()}
          </Text>
          {order.status === "ongoing" ? (
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
            Client: {order.providerData?.name || "N/A"}
          </Text>
          <Text style={styles.info}>
            Address: {order.providerData?.address}
          </Text>
          <Text style={styles.info}>Breed: {order.breed}</Text>
          <Text style={styles.info}>
            Email: {order.providerData?.email || "N/A"}
          </Text>
          <Text style={styles.info}>Request: {order.request}</Text>
          <Text style={styles.info}>
            Date: {new Date(order.date).toLocaleDateString()}
          </Text>
          <Text style={styles.info}>Status: {order.status}</Text>
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
});
