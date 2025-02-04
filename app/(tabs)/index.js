import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Button, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';



export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState();
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const navigation = useNavigation();

  const apiKey = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

  const getRandomRecipes = async () => {
    axios.get(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`)
    .then(response => setRecipes(response.data.recipes))
    .catch(error => console.error(error));
  };

  const getMealPlan = async () => {
    axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}`)
    .then(response => {
      console.log(response.data);
      setMealPlan(response.data);
    })
    .catch(error => console.error(error));
  };

  const getRecipeById = async (id) => {
    axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
    .then(response => console.log(response))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    getRandomRecipes();
    getMealPlan();
  }, []);

  const handleRecipePress = (recipe) => {
    setSelectedRecipes(prevSelectedRecipes => {
      if (prevSelectedRecipes.includes(recipe)) {
        return prevSelectedRecipes.filter(r => r.id !== recipe.id);
      } else {
        return [...prevSelectedRecipes, recipe];
      }
    });
  };

  const handleGenerateGroceryList = () => {
    if (selectedRecipes.length > 0) {
      navigation.navigate('groceryList', { recipes: selectedRecipes });
    }
  };

  if (!mealPlan) {
    return <Text>Loading...</Text>;
  }

  console.log(mealPlan)
  const days = Object.keys(mealPlan);
  

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecipePress(item)}>
            <ThemedView style={[
              styles.recipeContainer,
              selectedRecipes.some(r => r.id === item.id) && styles.selectedRecipeContainer
            ]}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
            </ThemedView>
          </TouchableOpacity>
        )}
      /> */}
      {/* <FlatList
        data={mealPlan}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecipePress(item)}>
            <ThemedView style={[
              styles.recipeContainer,
              selectedRecipes.some(r => r.id === item.id) && styles.selectedRecipeContainer
            ]}>
              <ThemedText type="subtitle">{item}</ThemedText>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
            </ThemedView>
          </TouchableOpacity>
        )} 
      />
      */}
      <ScrollView style={styles.container}>
      {days.map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>
          {day.meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={styles.mealContainer}
              onPress={() => navigation.navigate('MealDetail', { meal })}
            >
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <Text style={styles.mealDetails}>Ready in {meal.readyInMinutes} minutes</Text>
              <Text style={styles.mealDetails}>Servings: {meal.servings}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.nutrientsContainer}>
            <Text style={styles.nutrientsTitle}>Nutrients:</Text>
            <Text style={styles.nutrientsDetails}>Calories: {data.week[day].nutrients.calories.toFixed(2)}</Text>
            <Text style={styles.nutrientsDetails}>Protein: {data.week[day].nutrients.protein.toFixed(2)}g</Text>
            <Text style={styles.nutrientsDetails}>Fat: {data.week[day].nutrients.fat.toFixed(2)}g</Text>
            <Text style={styles.nutrientsDetails}>Carbs: {data.week[day].nutrients.carbohydrates.toFixed(2)}g</Text>
          </View>
        </View>
      ))}
    </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Generate Grocery List"
          onPress={handleGenerateGroceryList}
          disabled={selectedRecipes.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#A1CEDC',
    alignItems: 'center',
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recipeContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  selectedRecipeContainer: {
    borderColor: '#0000FF',
    borderWidth: 4,
  },
  recipeImage: {
    height: 150,
    width: '100%',
    borderRadius: 8,
  },
  buttonContainer: {
    padding: 16,
  },
});
