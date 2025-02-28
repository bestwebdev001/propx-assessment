import AsyncStorage from '@react-native-async-storage/async-storage';

export enum DataPersistKeys {
  USER = 'USER',
  IS_CASH_MODE = 'IS_CASH_MODE',
  // add more keys here
}

/**
 * Set persistent data
 */
export async function setPersistData<T>(key: DataPersistKeys, data: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

/**
 * Get persistent data
 */
export async function getPersistData<T>(key: DataPersistKeys): Promise<T | undefined> {
  try {
    const res = await AsyncStorage.getItem(key);
    return res ? JSON.parse(res) : undefined;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return undefined;
  }
}

/**
 * Remove persistent data by key
 */
export async function removePersistData(key: DataPersistKeys): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
}

/**
 * Remove all persistent data
 */
export async function removeAllPersistData(): Promise<void> {
  try {
    await Promise.all(Object.values(DataPersistKeys).map(value => AsyncStorage.removeItem(value)));
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
