import { View, Text, StyleSheet, Pressable } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { getFromDB } from "../firebase/firebaseHelpers";

export default function ProviderItem({ provider }) {
  const navigation = useNavigation();
  const [providerData, setProviderData] = useState(null);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        // Fetch user details from the 'users' collection
        const userDoc = await getFromDB(provider.id, "users");
        
        if (userDoc) {
          setProviderData({ ...provider, ...userDoc});
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching provider data: ", error);
      } 
    };
    fetchProviderData();
    console.log(providerData)
  }, [provider.id]);
  
  return (
    <View key={provider.id} style={styles.card}>
      <Pressable
        onPress={() => {
          navigation.navigate("PostOrderScreen", { provider });
        }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.name}>{provider.name}</Text>
          <View
            style={[
              styles.experienceBox,
              provider.experience ? styles.experienced : styles.noExperience,
            ]}
          >
            <Text style={styles.experienceText}>
              {provider.experience ? "Experienced" : "No Experience"}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.address}>Address: {provider.address}</Text>
          {provider.openForWork && provider.services.length > 0 && (
            <View style={styles.servicesTags}>
              {provider.services.map((service, index) => (
                <Text key={index} style={styles.serviceTag}>
                  {service}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: "green",
  },
  noExperience: {
    backgroundColor: "gray",
  },
  experienceText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },

  servicesTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceTag: {
    backgroundColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    margin: 4,
    fontSize: 12,
    color: "#ffffff",
    borderColor: "#4f4f4f",
    borderWidth: 1,
    overflow: "hidden",
    fontWeight: "bold",
    textAlign: "center",
  },
});
