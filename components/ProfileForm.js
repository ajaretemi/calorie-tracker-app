import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Mifflin-St Jeor Calculator
const calculateCalories = (weight, height, age, gender, activity, goal) => {
  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const maintenanceCalories = bmr * (activityMultiplier[activity] || 1.2);

  if (goal === 'lose') return Math.round(maintenanceCalories - 500);
  if (goal === 'gain') return Math.round(maintenanceCalories + 500);
  return Math.round(maintenanceCalories);
};

const ProfileForm = ({ onSubmit }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          name: '',
          age: '',
          gender: '',
          height: '',
          weight: '',
          activity: '',
          goal: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          age: Yup.number().required('Required').positive().integer(),
          gender: Yup.string().oneOf(['male', 'female']).required('Required'),
          height: Yup.number().required('Required'),
          weight: Yup.number().required('Required'),
          activity: Yup.string().required('Required'),
          goal: Yup.string().oneOf(['lose', 'maintain', 'gain']).required('Required'),
        })}
        onSubmit={(values) => {
          const calories = calculateCalories(
            Number(values.weight),
            Number(values.height),
            Number(values.age),
            values.gender,
            values.activity,
            values.goal
          );
          onSubmit({ ...values, calories });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput placeholder="Name" style={styles.input} onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput placeholder="Age" keyboardType="numeric" style={styles.input} onChangeText={handleChange('age')} onBlur={handleBlur('age')} value={values.age} />
            {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

            <TextInput placeholder="Gender (male/female)" style={styles.input} onChangeText={handleChange('gender')} onBlur={handleBlur('gender')} value={values.gender} />
            {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            <TextInput placeholder="Height (cm)" keyboardType="numeric" style={styles.input} onChangeText={handleChange('height')} onBlur={handleBlur('height')} value={values.height} />
            {touched.height && errors.height && <Text style={styles.error}>{errors.height}</Text>}

            <TextInput placeholder="Weight (kg)" keyboardType="numeric" style={styles.input} onChangeText={handleChange('weight')} onBlur={handleBlur('weight')} value={values.weight} />
            {touched.weight && errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

            <TextInput placeholder="Activity (sedentary, light, moderate, active, veryActive)" style={styles.input} onChangeText={handleChange('activity')} onBlur={handleBlur('activity')} value={values.activity} />
            {touched.activity && errors.activity && <Text style={styles.error}>{errors.activity}</Text>}

            <TextInput placeholder="Goal (lose, maintain, gain)" style={styles.input} onChangeText={handleChange('goal')} onBlur={handleBlur('goal')} value={values.goal} />
            {touched.goal && errors.goal && <Text style={styles.error}>{errors.goal}</Text>}

            <Button title="Save Profile" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 5 },
});

export default ProfileForm;
