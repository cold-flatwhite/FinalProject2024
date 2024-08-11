import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { writeToDB } from "../firebase/firebaseHelpers";
import { auth } from "../firebase/firebaseSetups";

export default function PostOrderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { provider } = route.params;

  const requestItems = provider.services.map((service) => ({
    label: service,
    value: service,
  }));

  const [request, setRequest] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [requestOpen, setRequestOpen] = useState(false);

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

  const handleConfirm = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
      }

      const orderData = {
        request,
        date: date.toISOString(),
        user_id: user.uid,
        provider_id: provider.id,
        status: "Submitted",
      };

      await writeToDB(orderData, "orders");
      Alert.alert("Success", "Order placed successfully!");
      navigation.replace("Main", { screen: "My Orders" });
    } catch (error) {
      console.error("Error placing order: ", error);
      Alert.alert("Error", "Failed to place order.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.providerInfoContainer}>
          <View style={styles.name}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerExperience}>
              {provider.experience ? "Experienced" : "No Experience"}
            </Text>
          </View>

          <Text style={styles.providerAddress}>
            Adress : {provider.address}
          </Text>
          <Text style={styles.providerContact}>Contact: {provider.email}</Text>
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
            display="inline"
            onChange={onChangeDate}
            style={styles.datePicker}
          />
        )}

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.replace("Main")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.confirmButton]}
            onPress={handleConfirm}
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
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  providerInfoContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  providerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  providerExperience: {
    fontSize: 15,
    color: "#4CAF50",
  },
  providerAddress: {
    fontSize: 14,
    color: "#555",
  },
  providerContact: {
    fontSize: 14,
    color: "#555",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#333",
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
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
    width: "100%",
  },
});
