import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Button, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
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

  const days = mealPlan;

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
      {Object.keys(days.week).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>
          {days.week[day].meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={styles.mealContainer}
              onPress={() => handleRecipePress(meal)}
            >
              <View style={[
              styles.recipeContainer,
              selectedRecipes.some(r => r.id === item.id) && styles.selectedRecipeContainer
            ]}>
              <Image
                source={{ uri: `https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}` }}
                style={styles.mealImage}
              />
              <View style={styles.mealInfo}>
                <Text style={styles.mealTitle}>{meal.title}</Text>
                <View style={styles.mealMetaContainer}>
                  <View style={styles.mealMeta}>
                    <Icon name="time" size={16} color="#666" />
                    <Text style={styles.mealDetails}>{meal.readyInMinutes} mins</Text>
                  </View>
                  <View style={styles.mealMeta}>
                    <Icon name="people" size={16} color="#666" />
                    <Text style={styles.mealDetails}>{meal.servings} servings</Text>
                  </View>
                </View>
              </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.nutrientsContainer}>
            <Text style={styles.nutrientsTitle}>Daily Nutrients</Text>
            <View style={styles.nutrientsGrid}>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{days.week[day].nutrients.calories.toFixed(0)}</Text>
                <Text style={styles.nutrientLabel}>Calories</Text>
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{days.week[day].nutrients.protein.toFixed(1)}g</Text>
                <Text style={styles.nutrientLabel}>Protein</Text>
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{days.week[day].nutrients.fat.toFixed(1)}g</Text>
                <Text style={styles.nutrientLabel}>Fat</Text>
              </View>
              <View style={styles.nutrientItem}>
                <Text style={styles.nutrientValue}>{days.week[day].nutrients.carbohydrates.toFixed(1)}g</Text>
                <Text style={styles.nutrientLabel}>Carbs</Text>
              </View>
            </View>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     backgroundColor: '#A1CEDC',
//     alignItems: 'center',
//     padding: 16,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   recipeContainer: {
//     gap: 8,
//     marginBottom: 8,
//     padding: 8,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   selectedRecipeContainer: {
//     borderColor: '#0000FF',
//     borderWidth: 4,
//   },
//   recipeImage: {
//     height: 150,
//     width: '100%',
//     borderRadius: 8,
//   },
//   buttonContainer: {
//     padding: 16,
//   },
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dayContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  mealContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  mealImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  mealInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  mealMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealDetails: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  nutrientsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  nutrientsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  nutrientsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutrientValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nutrientLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
});