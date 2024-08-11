// OrderItem.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

// Component to display an individual order
const OrderItem = ({ order, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.orderContainer,
        order.orderType === 'post'
          ? styles.postOrderContainer
          : styles.receivedOrderContainer,
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: order.image }} style={styles.image} />
      <View style={styles.orderDetails}>
        <Text style={styles.orderType}>
          {order.orderType === 'post' ? 'Placed Orders' : 'Received Orders'}
        </Text>
        <Text style={styles.service}>{order.request}</Text>
        <Text style={styles.date}>
          {new Date(order.date).toLocaleDateString()}
        </Text>
        <Text
          style={
            order.status === 'ongoing'
              ? styles.ongoing
              : order.status === 'Complete'
              ? styles.complete
              : order.status === 'Rejected'
              ? styles.rejected
              : styles.defaultStatus
          }
        >
          {order.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  postOrderContainer: {
    backgroundColor: '#FFF3E0',
  },
  receivedOrderContainer: {
    backgroundColor: '#E8F5E9',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  service: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  ongoing: {
    fontSize: 14,
    color: 'orange', // Orange for ongoing
  },
  complete: {
    fontSize: 14,
    color: 'green', // Green for complete
  },
  rejected: {
    fontSize: 14,
    color: 'red', // Red for rejected
  },
});

export default OrderItem;
