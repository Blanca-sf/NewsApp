import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function SmallHeader({ label = "Section", onPress }) {
  return (
    <View className="px-5 mt-6 mb-3 flex-row justify-between items-center">
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins",
          color: "#1e3a8a", 
        }}
        className="dark:text-white"
      >
        {label}
      </Text>
    </View>
  );
}
