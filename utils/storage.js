import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProfile = async (profile) => {
  try {
    const jsonValue = JSON.stringify(profile);
    await AsyncStorage.setItem('@user_profile', jsonValue);
  } catch (e) {
    console.log('Error saving profile:', e);
  }
};

export const loadProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_profile');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error loading profile:', e);
    return null;
  }
};
