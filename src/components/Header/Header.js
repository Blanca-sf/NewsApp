import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  return (
    <View className="items-center pt-6">
      <View className="flex-row items-center space-x-2">
        <Text
          style={{
            fontSize: 28,
            fontFamily: "Poppins",
            color: colorScheme === "dark" ? "#fff" : "#1e3a8a",
          }}
        >
          NewsApp
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("HomeTabs", { screen: "Search" })}
          style={{
            backgroundColor: colorScheme === "dark" ? "#1e3a8a" : "#e5e7eb",
            padding: 6,
            borderRadius: 999,
          }}
        >
          <MagnifyingGlassIcon
            size={20}
            strokeWidth={2}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
