import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseSetups";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFromDB } from "../firebase/firebaseHelpers";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user profile is complete
      const userData = await getFromDB(user.uid, "users");
      if (userData && userData.addressDisplay && userData.name && userData.email) {
        Alert.alert("Success", "User logged in successfully");
        navigation.navigate("Main");
      } else {
        Alert.alert("Profile Incomplete", "Please complete your profile first.");
        navigation.navigate("Profile");
      }
    } catch (error) {
      let message;
      switch (error.code) {
        case "auth/user-disabled":
          message = "The user account has been disabled by an administrator.";
          break;
        case "auth/user-not-found":
          message = "There is no user corresponding to the given email.";
          break;
        case "auth/wrong-password":
          message = "The password is invalid for the given email.";
          break;
        default:
          message = error.message;
          break;
      }
      Alert.alert("Error", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        New User? Create an account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  link: {
    marginTop: 16,
    color: "blue",
  },
});

export default LoginScreen;
