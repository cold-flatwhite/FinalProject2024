import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import PressableButton from "../components/PressableButton";
import { setToDB, getFromDB, updateToDB } from "../firebase/firebaseHelpers";
import { auth, storage } from "../firebase/firebaseSetups";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageManager from "../components/ImageManager";

export default function ProviderScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState(false);
  const [openForWork, setOpenForWork] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // State to store the list of services and whether each service is selected
  const [services, setServices] = useState([
    { label: "Dog Walking", value: "dogWalking", selected: false },
    { label: "Pet Sitting", value: "petSitting", selected: false },
    { label: "Grooming", value: "grooming", selected: false },
    { label: "Training", value: "training", selected: false },
  ]);

  // useEffect to load the user's profile from the database when the component mounts
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
          setAddress(userProfile.addressDisplay || "");
          setEmail(userProfile.email || "");
        }
        if (providerProfile) {
          setExperience(providerProfile.experience || false);
          setOpenForWork(providerProfile.openForWork || false);
          
          // Update services based on the provider profile data
          if (providerProfile.services) {
            setServices(
              services.map((service) => ({
                ...service,
                selected: providerProfile.services.includes(service.value),
              }))
            );
          }

          // Load and set the image URL from Firebase Storage
          if (providerProfile.imageUri) {
            const reference = ref(storage, providerProfile.imageUri);
            const url = await getDownloadURL(reference);
            setSelectedImage(url); 
          }
        }
      } catch (error) {
        console.error("Error loading user profile", error);
      }
    };
    loadUserProfile();
  }, []);

  // useEffect to reset the selected services if 'openForWork' is set to false
  useEffect(() => {
    if (!openForWork) {
      setServices(services.map((service) => ({ ...service, selected: false })));
    }
  }, [openForWork]);

  // Function to handle toggling the selection of a service
  const handleServiceToggle = (index) => {
    const updatedServices = services.map((service, i) => {
      if (i === index) {
        return { ...service, selected: !service.selected };
      }
      return service;
    });
    setServices(updatedServices);
  };

  // Function to handle the image taken by the user
  const handleImageTaken = (uri) => {
    setSelectedImage(uri); 
  };

  // Function to upload the image to Firebase Storage
  const uploadImageToStorage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath; 
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "Failed to upload image.");
      return null;
    }
  };

  // Function to handle submitting the user's provider profile
  const handleSubmit = async () => {
    const selectedServices = services
      .filter((service) => service.selected)
      .map((service) => service.value);

    let imageUriInStorage = null;
    if (selectedImage) {
      imageUriInStorage = await uploadImageToStorage(selectedImage);
    }

    const data = {
      experience,
      openForWork,
      services: selectedServices,
      imageUri: imageUriInStorage, 
    };

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No user logged in");
        return;
      }
      const userId = user.uid;
      await setToDB(data, "providers", userId);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
      alert("Error submitting data.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageManager onImageTaken={handleImageTaken} selectedImage={selectedImage} />
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
          <Text style={styles.buttonText}>Update</Text>
        </PressableButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E6F0FA",
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
