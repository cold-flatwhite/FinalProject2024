import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseSetups";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFromDB } from "../firebase/firebaseHelpers";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (password.length < 6) {
      setPasswordWarning("Weak password. Use at least 6 characters.");
      return;
    } else {
      setPasswordWarning("");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
        case "auth/invalid-email":
          message = "The email address is not valid.";
          break;
        default:
          message = error.message;
          break;
      }
      Alert.alert("Error", message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset the password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      {passwordWarning ? (
        <Text style={styles.warning}>{passwordWarning}</Text>
      ) : null}
      <Button title="Log In" onPress={handleLogin} />
      <TouchableOpacity onPress={handlePasswordReset}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
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
    backgroundColor: "#f7f7f7",
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
  warning: {
    color: "red",
    marginBottom: 8,
  },
  forgotPassword: {
    color: "#0066cc",
    marginTop: 16,
  },
  link: {
    marginTop: 16,
    color: "#0066cc",
  },
});

export default LoginScreen;
