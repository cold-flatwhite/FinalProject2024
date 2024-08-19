import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles"; 

// Component to display an individual provider
export default function ProviderItem({ provider, style }) {
  const navigation = useNavigation();

  return (
    <View key={provider.id} style={[styles.card, style]}>
      <Pressable
        onPress={() => {
          navigation.navigate("PostOrderScreen", { provider });
        }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.name}>{provider?.name}</Text>
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
          <Text style={styles.address}>Address: {provider.addressDisplay}</Text>
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
