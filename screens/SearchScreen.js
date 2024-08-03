import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { database } from "../firebase/firebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";

export default function SearchScreen() {
  const [providers, setProviders] = useState([]);
  const collectionName = "providers";
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, collectionName),
      (querySnapShot) => {
        let newArray = [];
        if (!querySnapShot.empty) {
          querySnapShot.forEach((docSnapShot) => {
            newArray.push({ ...docSnapShot.data(), id: docSnapShot.id });
          });
        }
        setProviders(newArray);
      }
    );
    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Map</Text>
      </View>
      <View style={styles.bottomContainer}>
        {providers.length === 0 ? (
          <Text>There is no providers</Text>
        ) : (
          <FlatList
            renderItem={({ item }) => {
              return <Text>{item.address}</Text>;
            }}
            data={providers}
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
    alignItems: "center",
  },
});
