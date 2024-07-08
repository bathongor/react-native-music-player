import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import SongList from "@/components/SongList";
import { useEffect, useState } from "react";
import { DownloadItem, getDownloadItems } from "@/modules/storage";

export default function TabTwoScreen() {
  const [songs, setSongs] = useState<DownloadItem[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const downloadQueue = await getDownloadItems("downloadQueue");
      setSongs(downloadQueue);
      console.log("downloadQueue", downloadQueue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View>
      <Text>HI</Text>
      <SongList songs={songs} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
