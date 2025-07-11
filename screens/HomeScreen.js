import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Tracker</Text>

      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <View style={styles.spacer} />

      <Button title="Go to Food Log" onPress={() => navigation.navigate('Food')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  spacer: { height: 15 }, // Adds spacing between buttons
});
