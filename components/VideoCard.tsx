import axios from "axios";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadItems, storeDownloadItems } from "@/modules/storage";

interface VideoCardProps {
  video: {
    title: string;
    channel: string;
    views: string;
    uploaded: string;
    thumbnail: string;
    videoId: string; // Assuming you have a unique video ID
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const handleDownload = async () => {
    // Example of handling download using Linking
    if (video.videoId) {
      //   Linking.openURL(video.videoUrl);

      const options = {
        method: "POST",
        url: "https://youtube-to-mp315.p.rapidapi.com/download",
        params: {
          url: `https://www.youtube.com/watch?v=${video.videoId}`,
          format: "mp3",
        },
        headers: {
          "x-rapidapi-key":
            "22e3aed1f0mshabdc8d07f2e3282p191498jsnfeb69313be29",
          "x-rapidapi-host": "youtube-to-mp315.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {},
      };

      try {
        const response = await axios.request(options);
        const downloadQueue = await getDownloadItems("downloadQueue");
        downloadQueue.push({
          ...response.data,
          videoTitle: video.title,
        });
        await storeDownloadItems("downloadQueue", downloadQueue);
        console.log("Data updated and stored.");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("No download URL available");
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.channel}>{video.channel}</Text>
        <Text style={styles.views}>{video.views}</Text>
        <Text style={styles.uploaded}>{video.uploaded}</Text>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
        >
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  channel: {
    marginTop: 5,
    color: "#555",
  },
  views: {
    marginTop: 5,
    color: "#777",
  },
  uploaded: {
    marginTop: 5,
    color: "#777",
  },
  downloadButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VideoCard;
