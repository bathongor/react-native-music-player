import {
  Image,
  StyleSheet,
  Platform,
  View,
  FlatList,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import VideoCard from "@/components/VideoCard";
import axios from "axios";

export default function HomeScreen() {
  const [data, setData] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([
    {
      thumbnail: "https://via.placeholder.com/120x90",
      title: "Sample Video 1",
      channel: "Channel 1",
      views: "1M",
      uploaded: "1 week ago",
    },
    {
      thumbnail: "https://via.placeholder.com/120x90",
      title: "Sample Video 2",
      channel: "Channel 2",
      views: "500K",
      uploaded: "2 weeks ago",
    },
  ]);

  const handleSearch = async (query: string) => {
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: query,
              key: "AIzaSyBYBpm90OCj2mOeTp9ypeOaB3x4-LkmVZw",
              type: "video",
              maxResults: 10,
            },
          }
        );

        const results = response.data.items.map((item: any) => ({
          thumbnail: item.snippet.thumbnails.default.url,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          uploaded: new Date(item.snippet.publishedAt).toDateString(),
          videoId: item.id.videoId,
        }));

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching data from the backend", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <VideoCard video={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
