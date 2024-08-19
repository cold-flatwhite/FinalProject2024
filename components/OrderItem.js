import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles"; 

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

export default OrderItem;
