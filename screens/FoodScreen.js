import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FoodScreen() {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [foodLog, setFoodLog] = useState([]);

  useEffect(() => {
    loadFoodLog();
  }, []);

  const saveFoodLog = async (log) => {
    try {
      await AsyncStorage.setItem('@food_log', JSON.stringify(log));
    } catch (e) {
      console.log('Error saving food log:', e);
    }
  };

  const loadFoodLog = async () => {
    try {
      const data = await AsyncStorage.getItem('@food_log');
      if (data) setFoodLog(JSON.parse(data));
    } catch (e) {
      console.log('Error loading food log:', e);
    }
  };

  const addFood = () => {
    if (!foodName || !calories) return;
    const newEntry = { id: Date.now().toString(), name: foodName, calories: parseInt(calories) };
    const updatedLog = [...foodLog, newEntry];
    setFoodLog(updatedLog);
    saveFoodLog(updatedLog);
    setFoodName('');
    setCalories('');
  };

  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log Your Food</Text>
      <TextInput placeholder="Food Name" style={styles.input} value={foodName} onChangeText={setFoodName} />
      <TextInput placeholder="Calories" style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" />
      <Button title="Add Food" onPress={addFood} />

      <Text style={styles.total}>Total: {totalCalories} kcal</Text>

      <FlatList
        data={foodLog}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.calories} kcal</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  total: { marginTop: 20, fontWeight: 'bold' },
});
