import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faDownload, faStop } from "@fortawesome/free-solid-svg-icons";
import DownloadComponent from "./DownloadComponent";
import { DownloadItem } from "@/modules/storage";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

interface Props {
  songs: DownloadItem[];
}

const SongList: React.FC<Props> = ({ songs }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
        });
      } catch (error) {
        console.error("Failed to set audio mode:", error);
      }
    };

    setupAudio();

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handlePlay = async (song: DownloadItem) => {
    // Add logic to play the song using an audio library or native modules
    console.log("Playing song:", song.videoTitle);

    const path = `${FileSystem.documentDirectory}${song.id}`;
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: path,
      },
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound !== null) {
      await sound.unloadAsync();
      setSound(null);
    }
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
        <Text>{item.videoTitle}</Text>
      </View>

      {!sound ? (
        <TouchableOpacity onPress={() => handlePlay(item)}>
          <FontAwesomeIcon icon={faPlay} size={24} color="blue" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => stopSound()}>
          <FontAwesomeIcon icon={faStop} size={24} color="blue" />
        </TouchableOpacity>
      )}

      <DownloadComponent url={item.downloadUrl} fileName={`${item.id}.mp3`} />
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
