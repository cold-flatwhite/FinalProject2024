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

  const [request, setRequest] = useState("Dog Walk");
  const [breed, setBreed] = useState("Terrier");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [requestOpen, setRequestOpen] = useState(false);
  const [breedOpen, setBreedOpen] = useState(false);

  const requestItems = [
    { label: "Dog Walk", value: "Dog Walk" },
    { label: "Pet Sitting", value: "Pet Sitting" },
    { label: "Vet Visit", value: "Vet Visit" },
  ];

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

        {/* Provider Information */}
        <View style={styles.providerInfoContainer}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.providerExperience}>
            {provider.experience ? "Experienced" : "No Experience"}
          </Text>
          <Text style={styles.providerPrice}>Price: ${provider.price}</Text>
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
        />

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date.toISOString().split("T")[0]}
          onFocus={showDatepicker}
          showSoftInputOnFocus={false} // Prevent keyboard from opening
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={onChangeDate}
          />
        )}

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
    </TouchableWithoutFeedback>
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
    alignItems : "center",
    flexDirection: 'row',
  },
  providerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  providerExperience: {
    fontSize: 16,
    color: "green",
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
  dropdown: {
    marginBottom: 15,
    borderColor: "#ccc",
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
