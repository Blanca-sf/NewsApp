import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext"; 

export default function StartScreen() {
  const navigation = useNavigation();
  const { signIn } = useAuth(); 
  const { signInAsGuest } = useAuth(); 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#3b82f6", "#1e3a8a"]}
        style={{ flex: 1, justifyContent: "space-between", padding: 24 }}
      >
       
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              fontSize: 36,
              color: "white",
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Welcome to NewsApp
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#e0e7ff",
              textAlign: "center",
              marginTop: 16,
              lineHeight: 24,
            }}
          >
            Discover what's happening in the world right now
          </Text>
        </View>

       
        <View style={{ alignItems: "center", marginBottom: 40, gap: 16 }}>
        
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingVertical: 14,
              paddingHorizontal: 48,
              borderRadius: 12,
              elevation: 4,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              width: "100%",
            }}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text
              style={{
                color: "#1e3a8a",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>

         
          <TouchableOpacity
            style={{
              borderColor: "white",
              borderWidth: 2,
              paddingVertical: 14,
              paddingHorizontal: 48,
              borderRadius: 12,
              width: "100%",
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity
  onPress={() => {
    signInAsGuest();
  }}
  style={{ marginTop: 16 }}
>
  <Text style={{ color: "#e0e7ff", fontSize: 14, textAlign: "center", textDecorationLine: "underline" }}>
    Skip for now
  </Text>
</TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
