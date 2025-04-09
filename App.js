import React, { useEffect } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "./src/graphql/apolloClient";

const queryClient = new QueryClient();

const AuthDebugger = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("👤 Usuario actual en App:", user);
  }, [user]);

  return null;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthDebugger />
          <AppNavigation />
        </AuthProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
