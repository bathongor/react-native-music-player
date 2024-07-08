import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faDownload } from "@fortawesome/free-solid-svg-icons";
import DownloadComponent from "./DownloadComponent";
import { DownloadItem } from "@/modules/storage";

interface Props {
  songs: DownloadItem[];
}

const SongList: React.FC<Props> = ({ songs }) => {
  const handlePlay = (song: DownloadItem) => {
    // Add logic to play the song using an audio library or native modules
    console.log("Playing song:", song.videoTitle);
  };

  const renderItem = ({ item }: { item: DownloadItem }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text>{item.title}</Text>
        <Text>Artist</Text>
      </View>
      <TouchableOpacity onPress={() => handlePlay(item)}>
        <FontAwesomeIcon icon={faPlay} size={24} color="blue" />
      </TouchableOpacity>
      <DownloadComponent url={item.downloadUrl} fileName={item.id} />
    </View>
  );

  return (
    <FlatList
      data={songs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default SongList;
