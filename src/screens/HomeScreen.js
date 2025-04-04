import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useQuery } from "@tanstack/react-query";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Components
import Header from "../components/Header/Header";
import SmallHeader from "../components/Header/SmallHeader";
import News from "../components/News/News";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

// API
import { fetchBreakingNews} from "../services/NewsApi";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();

  const { data: breakingNewsData, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });


  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(10),
          paddingTop: hp(2),
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}>
      
        <Header />

        <View style={{ marginTop: 24 }}>
          <SmallHeader label="Breaking News" />
          {isBreakingLoading ? (
            <LoadingOverlay />
          ) : (
            <News newsProps={breakingNewsData?.articles} />
          )}
        </View>

       
       
      </ScrollView>
    </SafeAreaView>
  );
}
