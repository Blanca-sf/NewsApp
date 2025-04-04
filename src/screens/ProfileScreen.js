import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [avatarUri, setAvatarUri] = useState(null);

  const handleLogout = () => {
    signOut();
  };

//   Chatgpt helped me implement the image picker functionality
//  Prompt: "How can I implement ImagePicker function so my user profile can select their avatar/picture ?"
//   This helped me implement the image picker simulating a camara functionality.

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9fafb",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#111827",
          marginBottom: 24,
        }}
      >
        My Profile
      </Text>

     
      <TouchableOpacity onPress={pickImage} style={{ alignItems: "center" }}>
        <Image
          source={{
            uri:
              avatarUri ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png", 
          }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            marginBottom: 8,
            borderWidth: 2,
            borderColor: "#1e3a8a",
          }}
        />
        <Text style={{ color: "#6b7280", fontSize: 13 }}>Change avatar</Text>
      </TouchableOpacity>

      {user ? (
        <View style={{ marginTop: 32, width: "100%" }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, color: "#6b7280" }}>Name</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1e3a8a",
              }}
            >
              {user.name || user.username || "Anonymous"}
            </Text>
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 16, color: "#6b7280" }}>Email</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1e3a8a",
              }}
            >
              {user.email || "No email"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "#1e3a8a",
              paddingVertical: 14,
              borderRadius: 12,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ fontSize: 16, color: "gray" }}>No active session</Text>
      )}
    </View>
  );
}
