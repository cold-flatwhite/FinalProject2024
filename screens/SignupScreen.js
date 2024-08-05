import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseSetup'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            Alert.alert('Success', 'User registered successfully');
            navigation.navigate('Main');  
        } catch (error) {
            let message;
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'The email address is already in use by another account.';
                    break;
                case 'auth/invalid-email':
                    message = 'The email address is not valid.';
                    break;
                case 'auth/operation-not-allowed':
                    message = 'Operation not allowed. Please contact support.';
                    break;
                case 'auth/weak-password':
                    message = 'The password is too weak.';
                    break;
                default:
                    message = error.message;
                    break;
            }
            Alert.alert('Error', message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Register" onPress={handleRegister} />
            <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
            >
                Already Registered? Login
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    link: {
        marginTop: 16,
        color: 'blue',
    },
});

export default SignupScreen;
