import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

const orders = [
  {
    id: 1,
    provider: 'Brandyn',
    client: 'Xin',
    service: 'Door to door cat feeding',
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
          onPress={() => navigation.navigate('Order Information', { order })}
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
