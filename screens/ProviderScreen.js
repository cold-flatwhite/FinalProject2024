import { View, TextInput, Text, StyleSheet, Image,Switch } from "react-native";
import React, { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

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
    { label: 'Breed 1', value: 'breed1' },
    { label: 'Breed 2', value: 'breed2' },
    
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/petcare.jpg")}
          alt="Local Icon"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Breed Preference</Text>
        <DropDownPicker
          open={open}
          value={breedPreference}
          items={items}
          setOpen={setOpen}
          setValue={setBreedPreference}
          setItems={setItems}
          placeholder="Select breed preference"
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Experience</Text>
        <Switch
          value={experience}
          onValueChange={setExperience}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>Open for work</Text>
        <Switch
          value={openForWork}
          onValueChange={setOpenForWork}
        />
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
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 8,
    paddingLeft: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom : 10,
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
