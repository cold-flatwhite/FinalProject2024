// ImageManager.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [response, requestPermission] = ImagePicker.useCameraPermissions(); // 使用 useCameraPermissions 钩子

  const verifyPermission = async () => {
    if (response?.granted) {
      return true;
    }

    const customAlert = await new Promise((resolve) => {
      Alert.alert(
        "Camera Access Required",
        "We need to access your camera.",
        [
          { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
          { text: "Allow", onPress: () => resolve(true) },
        ]
      );
    });

    if (!customAlert) {
      return false;
    }

    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
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

      if (!result.canceled) {
        setPickedImage(result.assets[0].uri);
        onImageTaken(result.assets[0].uri);
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
