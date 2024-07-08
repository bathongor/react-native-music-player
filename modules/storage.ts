import AsyncStorage from "@react-native-async-storage/async-storage";

interface DownloadItem {
  downloadUrl: string;
  endAt: any;
  endTime: any;
  format: string;
  id: string;
  quality: number;
  startAt: any;
  startTime: any;
  status: string;
  title: any;
  videoTitle: string;
}

const storeDownloadItems = async (
  key: string,
  value: DownloadItem[]
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getDownloadItems = async (key: string): Promise<DownloadItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    return [];
  }
};

export { DownloadItem, getDownloadItems, storeDownloadItems };
