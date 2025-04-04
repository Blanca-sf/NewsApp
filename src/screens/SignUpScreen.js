import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import React, { useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { useAuth } from "../context/AuthContext";
  import { useMutation } from "@apollo/client";
  import { ADD_USER } from "../graphql/mutations/userMutations";
  
  export default function SignUpScreen() {
    const { signUp } = useAuth();
    const navigation = useNavigation();
  
    const [enteredFirstname, setFirstname] = useState("");
    const [enteredEmail, setEmail] = useState("");
    const [enteredUsername, setUsername] = useState("");
    const [enteredPassword, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const [addUser] = useMutation(ADD_USER);
  
    const firstnameIsValid = /^[a-zA-Z]+$/.test(enteredFirstname.trim());
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail.trim());
    const usernameIsValid = /^[a-zA-Z0-9]+$/.test(enteredUsername.trim());
    const passwordIsValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/.test(
      enteredPassword
    );
  
    const handleRegister = async () => {
      setIsSubmitted(true);
  
      if (firstnameIsValid && emailIsValid && usernameIsValid && passwordIsValid) {
        try {
          const { data } = await addUser({
            variables: {
              name: `${enteredFirstname} ${enteredUsername}`,
              email: enteredEmail,
              username: enteredUsername,
              password: enteredPassword,
            },
          });
  
          if (data?.addUser) {
            signUp(
              data.addUser.id,
              data.addUser.email,
              data.addUser.name,
              data.addUser.username
            );
          }
        } catch (error) {
          console.error(" Error registering user:", error.message);
        }
      }
    };
  
    return (
      <View style={styles.container}>
       
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Start")}>
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
  
        <Text style={styles.title}>Create an account</Text>
  
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={enteredFirstname}
          onChangeText={setFirstname}
          placeholderTextColor="#888"
        />
        {!firstnameIsValid && isSubmitted && (
          <Text style={styles.error}>Invalid first name</Text>
        )}
  
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={enteredEmail}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!emailIsValid && isSubmitted && (
          <Text style={styles.error}>Invalid email address</Text>
        )}
  
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={enteredUsername}
          onChangeText={setUsername}
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
        {!usernameIsValid && isSubmitted && (
          <Text style={styles.error}>Invalid username</Text>
        )}
  
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            style={[styles.input, { flex: 1, borderWidth: 0 }]}
            value={enteredPassword}
            onChangeText={setPassword}
            placeholderTextColor="#888"
            secureTextEntry
          />
          <Ionicons name="lock-closed-outline" size={20} color="#1e3a8a" />
        </View>
        {!passwordIsValid && isSubmitted && (
          <Text style={styles.error}>
            Must be 8+ characters, with numbers & symbols
          </Text>
        )}
  
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#f9fafb",
      justifyContent: "center",
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      zIndex: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#1e3a8a",
      marginBottom: 32,
      fontFamily: "Poppins",
      textAlign: "center",
    },
    input: {
      backgroundColor: "#e5e7eb",
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 10,
      fontSize: 14,
      fontFamily: "Poppins",
      color: "#111827",
      marginBottom: 8,
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#e5e7eb",
      paddingHorizontal: 16,
      borderRadius: 10,
      marginBottom: 8,
    },
    button: {
      backgroundColor: "#1e3a8a",
      paddingVertical: 14,
      borderRadius: 10,
      marginTop: 16,
    },
    buttonText: {
      color: "white",
      fontFamily: "Poppins",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16,
    },
    error: {
      color: "#dc2626",
      fontSize: 13,
      marginBottom: 8,
      fontFamily: "Poppins",
    },
  });
  