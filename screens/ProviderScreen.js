import { View, TextInput, Text, StyleSheet, Image, Switch, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import PressableButton from "../component/PressableButton";
import { writeToDB } from "../firebase/firebaseHelper";

export default function ProviderScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState(false);
  const [openForWork, setOpenForWork] = useState(false);

  const [services, setServices] = useState([
    { label: "Dog Walking", value: "dogWalking", selected: false },
    { label: "Pet Sitting", value: "petSitting", selected: false },
    { label: "Grooming", value: "grooming", selected: false },
    { label: "Training", value: "training", selected: false }
  ]);


  useEffect(() => {
    if (!openForWork) {
      setServices(services.map(service => ({ ...service, selected: false })));
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
    if (!name || !address || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const selectedServices = services.filter(service => service.selected).map(service => service.value);

    const data = {
      name,
      address,
      email,
      experience,
      openForWork,
      services: selectedServices
    };

    try {
      await writeToDB(data, "providers");
      alert("Data submitted successfully!");
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
          <Text style={styles.label}>Services</Text>
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
          <Text style={styles.buttonText}>Register</Text>
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
    marginBottom: 16,
  },
  servicesContainer: {
    marginBottom: 16,
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
