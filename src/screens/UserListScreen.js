import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries/users";

export default function UserListScreen() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <ActivityIndicator size="large" color="#1e3a8a" />;
  if (error) return <Text>Error: {error.message}</Text>;

//   ChatGPT help me write some logic to sort users by login count
// Prompt: How can I sort Graphql data by logincount and display the most active users?
// This helped me implement a function that display the most active users.

  const sortedUsers = [...data.users].sort((a, b) => (b.loginCount || 0) - (a.loginCount || 0));

  return (
    <View style={{ flex: 1, padding: 20}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#1e3a8a",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Top Active Users
      </Text>

      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 10,
              marginBottom: 12,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1e3a8a" }}>
              #{index + 1} {item.name}
            </Text>
            <Text style={{ color: "#334155" }}>{item.email}</Text>
            <Text style={{ color: "#16a34a", marginTop: 4 }}>Logins: {item.loginCount || 0}</Text>
          </View>
        )}
      />
    </View>
  );
}
