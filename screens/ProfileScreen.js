import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import { getFromDB, setToDB, updateToDB } from '../firebase/firebaseHelper'; 
import { auth } from '../firebase/firebaseSetup'; 
import PressableButton from '../components/PressableButton';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [registeredProvider, setRegisteredProvider] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user logged in');
        return;
      }
      const userId = user.uid;
      try {
        const userProfile = await getFromDB(userId, 'users');
        if (userProfile) {
          setName(userProfile.name || '');
          setAddress(userProfile.address || '');
          setEmail(userProfile.email || '');
        }
      } catch (error) {
        console.error("Error loading profile data", error);
      }
    };
    loadProfile();
  }, []);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No user logged in');
      return;
    }
    const userId = user.uid;
    try {
      const userProfile = { name, address, email, registeredProvider};
      
      const existingProfile = await getFromDB(userId, 'users');
      if (existingProfile) {
        // Update existing profile
        await updateToDB(userId, 'users', userProfile);
      } else {
        // Create new profile
        await setToDB(userProfile, 'users', userId);
      }

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile data", error);
      Alert.alert('Error', 'Error updating profile.');
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
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
