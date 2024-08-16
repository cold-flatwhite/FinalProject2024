import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import { getFromDB, setToDB, updateToDB } from "../firebase/firebaseHelpers";
import { auth } from "../firebase/firebaseSetups";
import PressableButton from "../components/PressableButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { mapsApiKey } from "@env";
import LocationManager from "../components/LocationManager";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [addressDisplay, setAddressDisplay] = useState("");
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapsApiKey}`
      );

      if (response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      } else {
        Alert.alert("Error", "No address found for the provided coordinates.");
        return "";
      }
    } catch (error) {
      console.error("Error fetching address from coordinates", error);
      Alert.alert("Error", "Failed to fetch address.");
      return "";
    }
  };

  useEffect(() => {
    const updateAddressFromCoordinates = async () => {
      if (route.params?.location) {
        const { latitude, longitude } = route.params.location;
        setLocation({ latitude, longitude });
        const fetchedAddress = await fetchAddressFromCoordinates(
          latitude,
          longitude
        );
        setAddressDisplay(
          fetchedAddress || `Lat: ${latitude}, Lon: ${longitude}`
        );
      }
    };

    updateAddressFromCoordinates();
  }, [route.params?.location]);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      console.log("user", user);
      if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
      }
      const userId = user.uid;
      try {
        const userProfile = await getFromDB(userId, "users");

        if (userProfile) {
          setName(userProfile.name || "");
          setLocation(userProfile.location || null);
          setEmail(userProfile.email || "");

          if (userProfile.location) {
            const { latitude, longitude } = userProfile.location;
            setLocation({ latitude, longitude });
            const fetchedAddress = await fetchAddressFromCoordinates(
              latitude,
              longitude
            );
            setAddressDisplay(
              fetchedAddress || `Lat: ${latitude}, Lon: ${longitude}`
            );
          }
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }
    };
    loadProfile();
  }, [auth]);

  const handleUpdate = async () => {
    if (!name || !location || !email) {
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
      const userProfile = { name, location, email, addressDisplay };

      const existingProfile = await getFromDB(userId, "users");
      if (existingProfile) {
        await updateToDB(userId, "users", userProfile);
      } else {
        await setToDB(userProfile, "users", userId);
      }
      Alert.alert("Success", "Profile updated successfully!");
      navigation.replace("Main");
    } catch (error) {
      console.error("Error updating profile data", error);
      Alert.alert("Error", "Error updating profile.");
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
        <Pressable
          style={styles.addressButton}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.addressText}>
            {addressDisplay || "Tap to select address"}
          </Text>
        </Pressable>
      </View>
      <LocationManager location={location} />
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
    backgroundColor: "#E6F0FA",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#E6F0FA",
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
  addressButton: {
    flex: 2,
    height: 40,
    justifyContent: "center",
    paddingLeft: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  addressText: {
    color: "gray",
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
