import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

interface DownloadComponentProps {
  url: string;
  fileName: string;
}

const DownloadComponent: React.FC<DownloadComponentProps> = ({
  url,
  fileName,
}) => {
  const handleDownload = async () => {
    downloadAudioFile(url, fileName);
  };

  const downloadAudioFile = async (u: string, f: string) => {
    const path = `${FileSystem.documentDirectory}${f}`;

    try {
      const { uri } = await FileSystem.downloadAsync(u, path);
      Alert.alert("Success", `File downloaded successfully to ${uri}`);
    } catch (error: any) {
      Alert.alert("Error", `Failed to download file: ${error.message}`);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleDownload}>
        <FontAwesomeIcon icon={faDownload} size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default DownloadComponent;
