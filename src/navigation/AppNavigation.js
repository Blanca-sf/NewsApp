import { Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useAuth } from "../context/AuthContext";

// Screens
import SignUpScreen from "../screens/SignUpScreen";
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NewsScreen from "../screens/NewsScreen";
import SignInScreen from "../screens/SignInScreen";


import UserListScreen from "../screens/UserListScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Saved":
              iconName = "bookmark-outline";
              break;
            case "Search":
              iconName = "search-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={25}
              color={focused ? "blue" : "gray"}
            />
          );
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Poppins",
        },
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
  name="Users"
  component={UserListScreen}
  options={{
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="people-outline"
        size={25}
        color={focused ? "blue" : "gray"}
      />
    ),
  }}
/>

    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="UserList" component={UserListScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
