import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

// ImageManager component that allows users to pick or take a picture.
// It accepts two props: onImageTaken (a callback function to handle the image URI)
// and selectedImage (the initially selected image if any).

const ImageManager = ({ onImageTaken, selectedImage }) => {
  // State to manage the picked image
  const [pickedImage, setPickedImage] = useState(selectedImage);
  // Request and check camera permissions
  const [response, requestPermission] = ImagePicker.useCameraPermissions();

  // useEffect to update the pickedImage state if the selectedImage prop changes.
  useEffect(() => {
    if (selectedImage) {
      setPickedImage(selectedImage); 
    }
  }, [selectedImage]);

  // Function to verify and request camera permission if not already granted.
  const verifyPermission = async () => {
    if (response?.granted) {
      return true;
    }
    
    // Custom alert prompting the user to allow camera access.
    const customAlert = await new Promise((resolve) => {
      Alert.alert(
        "Camera Access Required",
        "We need to access your camera to allow you to take and upload pictures. Please allow access in the next prompt.",
        [
          { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
          { text: "Allow", onPress: () => resolve(true) },
        ]
      );
    });

    // If the user denies permission in the custom alert, return false.
    if (!customAlert) {
      return false;
    }

    // Request permission and return whether it was granted.
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  // Function to handle the action of taking an image.
  const takeImageHandler = async () => {
    // Verify if the user has granted permission to access the camera.
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      // Alert the user if permission was denied.
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take pictures. You can enable it in your device settings.",
        [{ text: "Okay" }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      // If the user didn't cancel the camera action, save the image URI.
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setPickedImage(imageUri);
        onImageTaken(imageUri); // pass URI
      }
    } catch (err) {
      console.error("Error taking image:", err);
      Alert.alert("Error", "An error occurred while taking the image.");
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button title="Upload or Take Pictures" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginVertical: 15,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 75,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageManager;
