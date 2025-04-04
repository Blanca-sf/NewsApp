import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useNavigation } from "@react-navigation/native";
  import { heightPercentageToDP as hp } from "react-native-responsive-screen";
  import { BookmarkIcon } from "react-native-heroicons/outline";
  import { StatusBar } from "expo-status-bar";
  import { useColorScheme } from "nativewind";
  import { useAuth } from "../context/AuthContext";
  import SmallHeader from "../components/Header/SmallHeader";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  export default function SavedScreen() {
    const { colorScheme } = useColorScheme();
    const navigation = useNavigation();
    const { user } = useAuth();
    const [savedArticles, setSavedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // ChatGPT helped me with the manage of saved articles per user using AsyncStorage 
    // Prompt: "How can I saved articles per user using AsyncStorage?"
    // This helped me implement a unique storage key with the user ID.
  
    const key = `savedArticles_${user?.id}`;
  
    const loadSaved = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        const articles = stored ? JSON.parse(stored) : [];
        setSavedArticles(articles);
      } catch (err) {
        console.error("Error loading saved articles:", err);
      } finally {
        setLoading(false);
      }
    };
  
    const removeArticle = async (url) => {
      const updated = savedArticles.filter((a) => a.url !== url);
      setSavedArticles(updated);
      await AsyncStorage.setItem(key, JSON.stringify(updated));
    };
  
    useEffect(() => {
      loadSaved();
      const unsubscribe = navigation.addListener("focus", loadSaved);
      return unsubscribe;
    }, [user]);
  
    const formatDate = (isoDate) => {
      return new Date(isoDate).toLocaleDateString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("NewsScreen", item)}
        className="mb-4"
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
       
          <Image
            source={{ uri: item.image || "https://via.placeholder.com/150" }}
            style={{ width: hp(10), height: hp(10) }}
          />
  
         
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <Text
              numberOfLines={3}
              style={{
                fontSize: hp(1.8),
                fontFamily: "Poppins",
                color: "#1e293b",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: hp(1.5),
                color: "#64748b",
                marginTop: 4,
              }}
            >
              {item?.author || "Unknown Author"}
            </Text>
            <Text
              style={{
                fontSize: hp(1.4),
                color: "#94a3b8",
                marginTop: 2,
              }}
            >
              {formatDate(item.publishedAt)}
            </Text>
          </View>
  
         
          <TouchableOpacity
            onPress={() => removeArticle(item.url)}
            style={{ paddingLeft: 6 }}
          >
            <BookmarkIcon size={22} color="#1e3a8a" strokeWidth={2} paddingRight={50} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <SafeAreaView className="px-4 pt-2 bg-white flex-1 dark:bg-neutral-900">
        <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
  
        <View style={{ marginTop: 24, marginBottom: 16 }}>
          <SmallHeader label="Saved Articles" />
        </View>
  
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : savedArticles.length === 0 ? (
          <Text className="text-gray-500 text-center">No articles saved yet.</Text>
        ) : (
          <FlatList
            data={savedArticles}
            keyExtractor={(item) => item.url}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp(6) }}
          />
        )}
      </SafeAreaView>
    );
  }
  