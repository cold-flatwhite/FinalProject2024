import { View, TextInput, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";

export default function ProviderScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");

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
});
