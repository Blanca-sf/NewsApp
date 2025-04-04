import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from "../../context/AuthContext";

export default function News({ newsProps }) {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);

  const key = `savedArticles_${user?.id}`;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  const handleClick = (item) => {
    navigation.navigate("NewsScreen", item);
  };

  // ChatGPT help me implement article saving in AsyncStorage and also toggle the bookmark icon
  // Prompt: "Implement a function to save articles in AsyncStorage and update the bookmark icon when clicked in a FlatList."
  // This helped me implement the saving and toggling of the bookmark icon.

  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const saved = await AsyncStorage.getItem(key);
      let savedArray = saved ? JSON.parse(saved) : [];

      const isBookmarked = savedArray.some((a) => a.url === item.url);

      if (!isBookmarked) {
        savedArray.push({
          title: item.title,
          url: item.url,
          image: item.urlToImage,
          publishedAt: item.publishedAt || new Date().toISOString(),
        });
        await AsyncStorage.setItem(key, JSON.stringify(savedArray));
      } else {
        savedArray = savedArray.filter((a) => a.url !== item.url);
        await AsyncStorage.setItem(key, JSON.stringify(savedArray));
      }

      const updatedStatus = [...bookmarkStatus];
      updatedStatus[index] = !isBookmarked;
      setBookmarkStatus(updatedStatus);
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  // ChatGPT helped me generate some logic to check if the article is already saved and compare it with the URLS.
  // Prompt: "Implement a function to check if an article is already saved in AsyncStorage."
  // This helped me check if the article is already saved and compare it with the URLS.

  useFocusEffect(
    useCallback(() => {
      const loadSaved = async () => {
        try {
          const saved = await AsyncStorage.getItem(key);
          const savedArray = saved ? JSON.parse(saved) : [];

          const statuses = newsProps.map((item) =>
            savedArray.some((a) => a.url === item.url)
          );
          setBookmarkStatus(statuses);
        } catch (error) {
          console.log("Error Loading Saved Articles", error);
        }
      };

      if (user?.id) {
        loadSaved();
      }
    }, [user, newsProps])
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleClick(item)}
      className="mb-5 px-4"
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        
        <Image
          source={{
            uri: item.urlToImage || "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80",
          }}
          style={{
            width: hp(12),
            height: hp(12),
            marginRight: 12,
          }}
          resizeMode="cover"
        />

        {/* 📝 Text */}
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={3}
            style={{
              fontSize: hp(1.9),
              fontWeight: "bold",
              color: "#1e293b",
            }}
          >
            {item.title}
          </Text>

          <Text style={{ fontSize: hp(1.5), color: "#64748b", marginTop: 4 }}>
            {item?.author || "Unknown Author"}
          </Text>

          <Text style={{ fontSize: hp(1.5), color: "#94a3b8", marginTop: 2 }}>
            {formatDate(item.publishedAt)}
          </Text>

          <TouchableOpacity
            style={{ marginTop: 6 }}
            onPress={() => toggleBookmarkAndSave(item, index)}
          >
            <BookmarkIcon
              size={22}
              color={bookmarkStatus[index] ? "#1e3a8a" : "gray"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="bg-white dark:bg-neutral-900">
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: hp(6) }}
      />
    </View>
  );
}
