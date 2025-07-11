import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ProfileForm from '../components/ProfileForm';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ProfileForm onSubmit={setProfile} />
      {profile && (
        <View style={{ marginTop: 20 }}>
          <Text>Daily Calorie Goal: {profile.calories} kcal</Text>
        </View>
      )}
    </View>
  );
}
