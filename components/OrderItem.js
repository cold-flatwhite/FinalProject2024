import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Component to display an individual order
const OrderItem = ({ order, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.orderContainer,
        order.orderType === "post"
          ? styles.postOrderContainer
          : styles.receivedOrderContainer,
      ]}
      onPress={onPress}
    >
      <View style={styles.orderDetails}>
        <View style={styles.headerContainer}>
          <Text style={styles.orderType}>
            {order.orderType === "post" ? "Placed Orders" : "Received Orders"}
          </Text>
          <Text style={styles.date}>
            {new Date(order.date).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.service}>Service Details: {order.request}</Text>
        <Text
          style={
            order.status === "Pending"
              ? styles.pending
              : order.status === "Accepted"
              ? styles.accepted
              : order.status === "Rejected"
              ? styles.rejected
              : styles.defaultStatus
          }
        >
          Order {order.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  postOrderContainer: {
    backgroundColor: "#FFF3E0",
  },
  receivedOrderContainer: {
    backgroundColor: "#E8F5E9",
  },
  orderDetails: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderType: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  service: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },

  pending: {
    fontSize: 14,
    color: "orange", // Orange for pending
  },
  accepted: {
    fontSize: 14,
    color: "green", // Green for accepted
  },
  rejected: {
    fontSize: 14,
    color: "red", // Red for rejected
  },
});

export default OrderItem;
