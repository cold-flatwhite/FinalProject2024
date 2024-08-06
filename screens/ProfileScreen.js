import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { getFromDB, setToDB, updateToDB } from "../firebase/firebaseHelpers";
import { auth } from "../firebase/firebaseSetups"; // Import signOut function
import PressableButton from "../components/PressableButton";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation(); // Get navigation prop

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
      }
      const userId = user.uid;
      try {
        const userProfile = await getFromDB(userId, "users");
        if (userProfile) {
          setName(userProfile.name || "");
          setAddress(userProfile.address || "");
          setEmail(userProfile.email || "");
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }
    };
    loadProfile();

    // Add sign out button to header
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleUpdate = async () => {
    if (!name || !address || !email) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "No user logged in");
      return;
    }
    const userId = user.uid;
    try {
      const userProfile = { name, address, email };

      const existingProfile = await getFromDB(userId, "users");
      if (existingProfile) {
        await updateToDB(userId, "users", userProfile);
      } else {
        await setToDB(userProfile, "users", userId);
      }

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile data", error);
      Alert.alert("Error", "Error updating profile.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Call Firebase signOut function
      Alert.alert("Success", "You have been signed out.");
      navigation.navigate("Login"); // Navigate to Login screen or other appropriate screen
    } catch (error) {
      console.error("Error signing out", error);
      Alert.alert("Error", "Error signing out.");
    }
  };

  return (
    <View style={styles.container}>
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
      <PressableButton pressedFunction={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </PressableButton>
    </View>
  );
};

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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signOutButton: {
    marginRight: 10,
  },
  signOutButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
