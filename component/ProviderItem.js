import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProviderItem({ provider }) {
  const navigation = useNavigation();

  return (
    <View key={provider.id} style={styles.card}>
      <Pressable
        onPress={() => {
            navigation.replace('PostOrderScreen', { provider });
        }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.name}>{provider.name}</Text>
          <View style={[
            styles.experienceBox,
            provider.experience ? styles.experienced : styles.noExperience
          ]}>
            <Text style={styles.experienceText}>
              {provider.experience ? "Experienced" : "No Experience"}
            </Text>
          </View>
          <Text style={styles.price}>${provider.price}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.address}>{provider.address}</Text>
          <Text style={styles.info}>Email: {provider.email}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 2,
  },
  experienceBox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
    flex: 1,
  },
  experienced: {
    backgroundColor: 'green',
  },
  noExperience: {
    backgroundColor: 'gray',
  },
  experienceText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  body: {
    marginTop: 5,
  },
  address: {
    fontSize: 14,
  },
  info: {
    fontSize: 14,
  },
});
