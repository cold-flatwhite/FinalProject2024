import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { database } from "../firebase/firebaseSetups";
import { collection, onSnapshot } from "firebase/firestore";
import ProviderItem from "../components/ProviderItem";
import LocationManager from "../components/LocationManager";
import MapView, { Marker } from "react-native-maps";
import { getFromDB } from "../firebase/firebaseHelpers";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function SearchScreen() {
  const [providers, setProviders] = useState([]);
  const collectionName = "providers";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, collectionName),
      async (querySnapShot) => {
        let newArray = [];
        if (!querySnapShot.empty) {
          for (const docSnapShot of querySnapShot.docs) {
            const providerData = docSnapShot.data();
            const userId = docSnapShot.id;
            const userDoc = await getFromDB(userId, "users");
            if (userDoc) {
              newArray.push({ ...providerData, ...userDoc, id: userId });
              console.log(newArray);
            }
          }
        }
        setProviders(newArray);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Available Providers on Map</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {providers.map((provider) => (
            <Marker
              key={provider.id}
              coordinate={{
                latitude: provider.location.latitude,
                longitude: provider.location.longitude,
              }}
              title={provider.name}
              description={provider.address}
            >
              <View style={{ alignItems: "center" }}>
                <FontAwesome5 name="house-user" size={20} color="red" />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Avaiable Providers</Text>
        {providers.length === 0 ? (
          <Text>There is no providers</Text>
        ) : (
          <FlatList
            renderItem={({ item }) => {
              return <ProviderItem provider={item} />;
            }}
            data={providers}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textStyle: {
    color: "darkmagenta",
    fontSize: 25,
  },
  textContainer: {
    color: "darkmagenta",
    backgroundColor: "#aaa",
    marginVertical: 15,
    padding: 15,
    borderRadius: 5,
  },

  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#dcd",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
