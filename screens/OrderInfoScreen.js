import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function OrderInfoScreen({ route }) {
  // const { order } = route.params;

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: order.image }} style={styles.image} />
      <Text style={styles.info}>Order number: {order.id}</Text>
      <Text style={styles.info}>Provider: {order.provider}</Text>
      <Text style={styles.info}>Client: {order.client}</Text>
      <Text style={styles.info}>Address: {order.address}</Text>
      <Text style={styles.info}>Breed: {order.breed}</Text>
      <Text style={styles.info}>Email: {order.email}</Text>
      <Text style={styles.info}>Request: {order.service}</Text>
      <Text style={styles.info}>Date: {order.dateRange}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
