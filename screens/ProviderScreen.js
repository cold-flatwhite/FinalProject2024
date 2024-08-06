import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import PressableButton from "../components/PressableButton";
import { setToDB, getFromDB, updateToDB } from "../firebase/firebaseHelpers";
import { auth } from "../firebase/firebaseSetups";

export default function ProviderScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState(false);
  const [openForWork, setOpenForWork] = useState(false);
  const [registeredProvider, setRegisteredProvider] = useState(false);

  const [services, setServices] = useState([
    { label: "Dog Walking", value: "dogWalking", selected: false },
    { label: "Pet Sitting", value: "petSitting", selected: false },
    { label: "Grooming", value: "grooming", selected: false },
    { label: "Training", value: "training", selected: false },
  ]);

  useEffect(() => {
    const loadUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
      }
      const userId = user.uid;
      try {
        const userProfile = await getFromDB(userId, "users");
        const providerProfile = await getFromDB(userId, "providers");
        if (userProfile) {
          setName(userProfile.name || "");
          setAddress(userProfile.address || "");
          setEmail(userProfile.email || "");
        }
        if (providerProfile) {
          setExperience(providerProfile.experience || false);
          setOpenForWork(providerProfile.openForWork || false);
          setRegisteredProvider(providerProfile.registeredProvider || false);

          if (providerProfile.services) {
            setServices(
              services.map((service) => ({
                ...service,
                selected: providerProfile.services.includes(service.value),
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error loading user profile", error);
      }
    };
    loadUserProfile();
  }, []);

  useEffect(() => {
    if (!openForWork) {
      setServices(services.map((service) => ({ ...service, selected: false })));
    }
  }, [openForWork]);

  const handleServiceToggle = (index) => {
    const updatedServices = services.map((service, i) => {
      if (i === index) {
        return { ...service, selected: !service.selected };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const handleSubmit = async () => {
    const selectedServices = services
      .filter((service) => service.selected)
      .map((service) => service.value);

    const data = {
      experience,
      openForWork,
      services: selectedServices,
      registeredProvider: "true",
    };

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
      }

      const userId = user.uid;

      if (registeredProvider) {
        await updateToDB(userId, "providers", data);
        alert("Data updated successfully!");
      } else {
        await setToDB(data, "providers", userId);
        alert("Data submitted successfully!");
      }
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("Error submitting data.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/petcare.jpg")} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.text}>{address}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{email}</Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Experience</Text>
        <Switch value={experience} onValueChange={setExperience} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Open for work</Text>
        <Switch value={openForWork} onValueChange={setOpenForWork} />
      </View>

      {openForWork && (
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <View key={service.value} style={styles.switchContainer}>
              <Text>{service.label}</Text>
              <Switch
                value={service.selected}
                onValueChange={() => handleServiceToggle(index)}
              />
            </View>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={handleSubmit}>
          <Text style={styles.buttonText}>
            {registeredProvider ? "Update" : "SignUp"}
          </Text>
        </PressableButton>
      </View>
    </ScrollView>
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
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  text: {
    flex: 2,
    fontSize: 16,
    color: "gray",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  servicesContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
