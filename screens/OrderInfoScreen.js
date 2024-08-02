import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function OrderInfoScreen({ route }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: order.image }} style={styles.image} />
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
