import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchNews } from "../services/NewsApi";
import { debounce } from "lodash";
import News from "../components/News/News";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);
        setLoading(false);
        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search news..."
          placeholderTextColor={"gray"}
          style={styles.input}
          autoFocus
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <XMarkIcon size={24} color="#374151" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

    
      {!results.length && !loading && !searchTerm && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}> Search news from around the world!</Text>
        </View>
      )}

     
      {searchTerm && !loading && results.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.noResults}>No results found for "{searchTerm}"</Text>
        </View>
      )}

     
      {results.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {results.length} results for "{searchTerm}"
          </Text>
        </View>
      )}

      
      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <News newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 999,
    paddingHorizontal: 16,
    
    
   
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontFamily: "Poppins",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
   
  },
  noResults: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
    textAlign: "center",
  },
  resultsHeader: {
    marginBottom: 12,
    marginHorizontal: 4,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
});
