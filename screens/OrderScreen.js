import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const orders = [
  {
    id: 1,
    provider: 'Brandyn',
    client: 'Xin',
    service: 'Door to door cat feeding Jul 10',
    status: 'Ongoing',
    dateRange: 'July 10-17',
    email: 'xxx@xxx.ca',
    address: 'xxx Ave',
    breed: 'Felis Catus',
    image: 'https://example.com/cat.png' 
  },
  {
    id: 2,
    provider: 'Janet',
    client: 'Janet',
    service: 'Dog walk Jul 1-7',
    status: 'Complete',
    dateRange: 'July 1-7',
    email: 'xxx@xxx.ca',
    address: 'xxx Ave',
    breed: 'Dog',
    image: 'https://example.com/dog.png' 
  }
];

export default function OrderScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {orders.map(order => (
        <TouchableOpacity
          key={order.id}
          style={styles.orderContainer}
          onPress={() => navigation.navigate('OrderInfo', { order })}
        >
          <Image source={{ uri: order.image }} style={styles.image} />
          <View>
            <Text style={styles.provider}>{order.provider} <Text style={styles.providerTag}>Provider</Text></Text>
            <Text style={styles.service}>{order.service}</Text>
            <Text style={order.status === 'Ongoing' ? styles.ongoing : styles.complete}>{order.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  provider: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  providerTag: {
    backgroundColor: 'yellow',
  },
  service: {
    fontSize: 16,
  },
  ongoing: {
    color: 'red',
  },
  complete: {
    color: 'green',
  },
});
