import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { database } from "../firebase/firebaseSetups";
import { collection, onSnapshot } from "firebase/firestore";
import ProviderItem from "../components/ProviderItem";
import MapView, { Marker } from "react-native-maps";
import { getFromDB } from "../firebase/firebaseHelpers";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { mapsApiKey } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchScreen() {
  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "providers"),
      async (querySnapShot) => {
        let newArray = [];
        if (!querySnapShot.empty) {
          for (const docSnapShot of querySnapShot.docs) {
            const providerData = docSnapShot.data();
            const userId = docSnapShot.id;
            const userDoc = await getFromDB(userId, "users");
            if (userDoc) {
              newArray.push({ ...providerData, ...userDoc, id: userId });
            }
          }
        }
        setProviders(newArray);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleMarkerPress = (providerId) => {
    setSelectedProviderId(providerId);
  };

  const handlePlaceSelect = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const { geometry } = details;
      const { location } = geometry;
      setRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      alert("Unable to retrieve location details");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          onPress={handlePlaceSelect}
          query={{
            key: mapsApiKey,
            language: 'en',
            types: 'geocode',
          }}
          fetchDetails={true} 
          styles={autocompleteStyles}
        />
        <MapView
          style={styles.map}
          region={region} 
        >
          {providers.map((provider) => (
            <Marker
              key={provider.id}
              coordinate={{
                latitude: provider.location.latitude,
                longitude: provider.location.longitude,
              }}
              title={provider.name}
              onPress={() => handleMarkerPress(provider.id)}
            >
              <View style={{ alignItems: "center" }}>
                <FontAwesome5 name="house-user" size={20} color="red" />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Available Providers</Text>
        {providers.length === 0 ? (
          <Text>There are no providers</Text>
        ) : (
          <FlatList
            renderItem={({ item }) => {
              const isSelected = item.id === selectedProviderId;
              return (
                <ProviderItem
                  provider={item}
                  style={isSelected ? styles.selectedItem : {}}
                />
              );
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
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  selectedItem: {
    backgroundColor: "#f0f8ff",
    borderColor: "#4682b4",
    borderWidth: 2,
  },
});

const autocompleteStyles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listView: {
    backgroundColor: '#fff',
  },
});
