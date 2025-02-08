import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from '../constant/firebaseConfig'; // Import Firebase config

export default function EmailPassauth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false); // Toggle between Login & Register

    const auth = getAuth(app); // Initialize Firebase Auth

    // Function to create a new user
    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Account created successfully!");
            setEmail(""); 
            setPassword("");
            console.log("successfull account created");
        } catch (error) {
            Alert.alert("Signup Failed", error.message);
        }
    };

    // Function to log in a user
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password!");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Logged in successfully!");
            setEmail(""); 
            setPassword("");
            console.log("successfull login");
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isLogin ? "Login" : "Create an Account"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleRegister}>
                <Text style={styles.buttonText}>{isLogin ? "Login" : "Create Account"}</Text>
            </TouchableOpacity>

            {/* Toggle Button at Bottom */}
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleText}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login here"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// 🔹 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#121212",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 30,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#888",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        paddingLeft: 15,
        marginBottom: 15,
    },
    button: {
        width: '90%',
        height: 55,
        backgroundColor: "#007bff",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    toggleText: {
        marginTop: 20,
        color: "#007bff",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});


