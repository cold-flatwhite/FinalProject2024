import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PostOrderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { provider } = route.params;

  const requestItems = provider.services.map(service => ({
    label: service,
    value: service,
  }));

  const [request, setRequest] = useState("");
  const [breed, setBreed] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [requestOpen, setRequestOpen] = useState(false);
  const [breedOpen, setBreedOpen] = useState(false);

  const breedItems = [
    { label: "Terrier", value: "Terrier" },
    { label: "Labrador", value: "Labrador" },
    { label: "Poodle", value: "Poodle" },
  ];

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.providerInfoContainer}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.providerExperience}>
            {provider.experience ? "Experienced" : "No Experience"}
          </Text>
          <Text style={styles.providerAddress}>Adress  : {provider.address}</Text>
          <Text style={styles.providerContact}>
            Contact: {provider.email}
          </Text>
          <Text style={styles.providerServices}>
            Services: {provider.services.join(", ")}
          </Text>
        </View>

        <Text style={styles.label}>Request</Text>
        <DropDownPicker
          open={requestOpen}
          value={request}
          items={requestItems}
          setOpen={setRequestOpen}
          setValue={setRequest}
          setItems={() => {}}
          style={styles.dropdown}
          placeholder="Select a request"
          zIndex={1000}
          zIndexInverse={1000}
        />

        <Text style={styles.label}>Breed</Text>
        <DropDownPicker
          open={breedOpen}
          value={breed}
          items={breedItems}
          setOpen={setBreedOpen}
          setValue={setBreed}
          setItems={() => {}}
          style={styles.dropdown}
          placeholder="Select a breed"
          zIndex={999}
          zIndexInverse={999}
        />

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date.toISOString().split("T")[0]}
          onFocus={showDatepicker}
          showSoftInputOnFocus={false}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
            style={styles.datePicker}
          />
        )}

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.replace("My orders")}
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  providerInfoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  providerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  providerExperience: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 8,
  },
  providerAddress: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  providerContact: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  providerServices: {
    fontSize: 16,
    color: "#555",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF5722",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  datePicker: {
    width: '100%',
    marginTop: 20,
  },
});
