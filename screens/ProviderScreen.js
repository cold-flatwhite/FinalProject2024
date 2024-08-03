import { View, TextInput, Text, StyleSheet, Image, Switch } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import PressableButton from "../component/PressableButton";
import { writeToDB } from "../firebase/firebaseHelper";

export default function ProviderScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [breedPreference, setBreedPreference] = useState(null);
  const [experience, setExperience] = useState(false);
  const [openForWork, setOpenForWork] = useState(false);
  const [items, setItems] = useState([
    { label: "Breed 1", value: "breed1" },
    { label: "Breed 2", value: "breed2" },
  ]);

  const handleSubmit = async () => {
    if (!name || !address || !email || !price || breedPreference === null) {
      alert("Please fill in all required fields.");
      return;
    }

    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate price to be a number
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    const data = {
      name,
      address,
      email,
      price: priceNumber,
      breedPreference,
      experience,
      openForWork,
    };

    try {
      await writeToDB(data, "providers");
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("Error submitting data.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/petcare.jpg")} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed Preference</Text>
        <DropDownPicker
          open={open}
          value={breedPreference}
          items={items}
          setOpen={setOpen}
          setValue={setBreedPreference}
          setItems={setItems}
          placeholder="Select breed preference"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Experience</Text>
        <Switch value={experience} onValueChange={setExperience} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Open for work</Text>
        <Switch value={openForWork} onValueChange={setOpenForWork} />
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  dropdownContainer: {
    height: 40,
    flex: 2,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
