import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 

export default function SignInScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Start")}>
        <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    padding: 24,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
    color: "#1e3a8a",
  },
  input: {
    backgroundColor: "#e2e8f0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontFamily: "Poppins",
    color: "#111827",
  },
  button: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
