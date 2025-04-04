import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { WebView } from "react-native-webview";
  import { ChevronLeftIcon } from "react-native-heroicons/outline";
  import { useAuth } from "../context/AuthContext";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const { height, width } = Dimensions.get("window");
  
  export default function NewsScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const { user } = useAuth();
  
    const [visible, setVisible] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
  
    const storageKey = `savedArticles_${user?.id || "guest"}`;
  
   
    useEffect(() => {
      const checkIfBookmarked = async () => {
        try {
          const saved = await AsyncStorage.getItem(storageKey);
          const savedArticles = saved ? JSON.parse(saved) : [];
          const isSaved = savedArticles.some((a) => a.url === item.url);
          setIsBookmarked(isSaved);
        } catch (error) {
          console.error("Error checking bookmarks:", error);
        }
      };
  
      checkIfBookmarked();
    }, [item.url]);
  
    
    const toggleBookmark = async () => {
        if (!user?.id) return;
      
        const key = `savedArticles_${user.id}`;
        try {
          const stored = await AsyncStorage.getItem(key);
          let savedArticles = stored ? JSON.parse(stored) : [];
      
          const exists = savedArticles.find((a) => a.url === item.url);
      
          if (exists) {
            savedArticles = savedArticles.filter((a) => a.url !== item.url);
            setIsBookmarked(false);
          } else {
            savedArticles.push({
              title: item.title,
              url: item.url,
              image: item.urlToImage,
              publishedAt: item.publishedAt || new Date().toISOString(),
            });
            setIsBookmarked(true);
          }
      
          await AsyncStorage.setItem(key, JSON.stringify(savedArticles));
        } catch (err) {
          console.error("Error toggling bookmark:", err);
        }
      };
      
      useEffect(() => {
        const checkBookmark = async () => {
          const key = `savedArticles_${user?.id}`;
          try {
            const stored = await AsyncStorage.getItem(key);
            const savedArticles = stored ? JSON.parse(stored) : [];
      
            const isSaved = savedArticles.some((a) => a.url === item.url);
            setIsBookmarked(isSaved);
          } catch (err) {
            console.error("Error checking bookmark:", err);
          }
        };
      
        if (user?.id) {
          checkBookmark();
        }
      }, [item.url, user]);
      
  
    const toggleBookmarkAndSave = () => {
      if (!user || user.isGuest) {
        Alert.alert("Sign in required", "Please sign in to save articles.");
        return;
      }
  
      toggleBookmark();
    };
  
    return (
      <>
       
        <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
          <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.navigate("HomeTabs", { screen: "Saved" })}>
  <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
</TouchableOpacity>

          </View>
  
          <View className="space-x-3 rounded-full items-center justify-center flex-row">
           
  
           
          </View>
        </View>
  
       
        <WebView
          source={{ uri: item.url }}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
        />
  
        {visible && (
          <ActivityIndicator
            size={"large"}
            color={"blue"}
            style={{
              position: "absolute",
              top: height / 2,
              left: width / 2,
            }}
          />
        )}
      </>
    );
  }
  