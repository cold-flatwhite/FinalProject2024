import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseSetups";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import Feather from '@expo/vector-icons/Feather';

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 密码可见性状态
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ Inter_900Black });

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // 复杂密码检查
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long and contain both letters and numbers.");
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        Alert.alert("Error", "Account already exists"); // 提示账户已存在
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Profile Incomplete", "Please complete your profile first.");
      navigation.navigate("Profile");
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
          secureTextEntry={!isPasswordVisible} // 根据状态显示或隐藏密码
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!isPasswordVisible} // 根据状态显示或隐藏密码
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Feather name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>
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
  link: {
    marginTop: 16,
    color: "#0066cc",
  },
});

export default SignupScreen;
