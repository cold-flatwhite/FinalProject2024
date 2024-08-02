import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";

export default function ProviderScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  return (
    <View>
      <View>
        <Text>Name</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
      </View>

      <View>
        <Text>Address</Text>
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View>
        <Text>Email</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      </View>

      <View>
        <Text>Price</Text>
        <TextInput placeholder="Price" value={price} onChangeText={setPrice} />
      </View>
    </View>
  );
}
