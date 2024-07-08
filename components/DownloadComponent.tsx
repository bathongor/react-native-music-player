import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { request, PERMISSIONS } from "react-native-permissions";
import { writeFile } from "react-native-fs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface DownloadComponentProps {
  url: string;
  fileName: string;
}

const DownloadComponent: React.FC<DownloadComponentProps> = ({
  url,
  fileName,
}) => {
  const handleDownload = async () => {
    try {
      // Request permission to write to external storage
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to download files.",
            buttonPositive: "OK",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission denied");
          return;
        }
      }

      // Get the actual file URL
      const { config, fs } = RNFetchBlob;
      let fileUrl = url;
      const fileExtension = fileUrl.split(".").pop();
      const { dirs } = fs;
      const dirToSave =
        Platform.OS === "ios" ? dirs.DocumentDir : dirs.DownloadDir;
      const path = `${dirToSave}/${fileName}.${fileExtension}`;
      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: "Downloading file.",
        },
      }).fetch("GET", fileUrl);
      await writeFile(path, res.data, "base64");
      console.log("File downloaded to:", path);
    } catch (error) {
      console.error("Error downloading file:", error);
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
