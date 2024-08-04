import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PostOrderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { provider } = route.params; // Get provider from route params

  const [request, setRequest] = useState("Dog Walk");
  const [breed, setBreed] = useState("Terrier");
  const [date, setDate] = useState("2024-07-01");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Order</Text>
      
      <View style={styles.providerInfoContainer}>
        <Text style={styles.providerName}>{provider.name}</Text>
        <Text style={styles.providerExperience}>
          {provider.experience ? "Experienced" : "No Experience"}
        </Text>
        <Text style={styles.providerPrice}>Price: ${provider.price}</Text>
      </View>

      <Text style={styles.label}>Request</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={request}
          onValueChange={(itemValue) => setRequest(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Dog Walk" value="Dog Walk" />
          <Picker.Item label="Pet Sitting" value="Pet Sitting" />
          <Picker.Item label="Vet Visit" value="Vet Visit" />
        </Picker>
      </View>

      <Text style={styles.label}>Breed</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={breed}
          onValueChange={(itemValue) => setBreed(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Terrier" value="Terrier" />
          <Picker.Item label="Labrador" value="Labrador" />
          <Picker.Item label="Poodle" value="Poodle" />
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.confirmButton]}
          onPress={() => {
            // Add logic to handle confirm action
          }}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  providerInfoContainer: {
    marginBottom: 20,
  },
  providerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  providerExperience: {
    fontSize: 16,
    color: 'green',
  },
  providerPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "green",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
