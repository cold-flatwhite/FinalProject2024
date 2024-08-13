import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseSetups";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFromDB } from "../firebase/firebaseHelpers";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import Feather from '@expo/vector-icons/Feather';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ Inter_900Black });

  const handleLogin = async () => {
    if (password.length < 6) {
      setPasswordWarning("Weak password. Use at least 6 characters.");
      return;
    } else {
      setPasswordWarning("");
    }

    // Sign in the user with Firebase Authentication
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
      // Handle different authentication errors and display appropriate messages
      switch (error.code) {
        case "auth/user-disabled":
          message = "The user account has been disabled by an administrator.";
          break;
        case "auth/user-not-found":
          message = "Account does not exist"; 
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
      Alert.alert("Attention", message);
    }
  };

  // Function to handle password reset via email
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Attention", "Please enter your email to reset the password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "Account does not exist"); 
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  // Function to toggle password visibility on and off
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible} 
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#E6F0FA",
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
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
