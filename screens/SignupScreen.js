import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseSetups";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ Inter_900Black });

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Success", "User registered successfully");
      navigation.navigate("Main");
    } catch (error) {
      let message;
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "The email address is already in use by another account.";
          break;
        case "auth/invalid-email":
          message = "The email address is not valid.";
          break;
        case "auth/operation-not-allowed":
          message = "Operation not allowed. Please contact support.";
          break;
        case "auth/weak-password":
          message = "The password is too weak.";
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
      <Text style={styles.title}>Petopia</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already Registered? Login
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
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 50,
    fontFamily: 'Inter_900Black',
    marginBottom: 24,
    color: "#1E90FF",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  link: {
    marginTop: 16,
    color: "#0066cc",
  },
});

export default SignupScreen;
