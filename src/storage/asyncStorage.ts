import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageItem = async (
  key: string,
): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    console.error(`failed to get async store ${key}`);
    return null;
  }
};

export const setStorageItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    console.error(`failed to store ${key}: ${value}`);
  }
};
