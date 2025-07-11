import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProfileForm from '../components/ProfileForm';
import { saveProfile, loadProfile } from '../utils/storage';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedProfile = await loadProfile();
      if (storedProfile) setProfile(storedProfile);
    };
    fetchProfile();
  }, []);

  const handleSave = async (values) => {
    await saveProfile(values);
    setProfile(values);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ProfileForm onSubmit={handleSave} />
      {profile && (
        <View style={{ marginTop: 20 }}>
          <Text>Hi, {profile.name}!</Text>
          <Text>Your Daily Calories: {profile.calories} kcal</Text>
        </View>
      )}
    </View>
  );
}
