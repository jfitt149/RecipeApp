import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://api.spoonacular.com/recipes/random?number=5&apiKey=5f66d1a8b40f4328b6b8c5d9e3ec3199')
      .then(response => setRecipes(response.data.recipes))
      .catch(error => console.error(error));
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

  return (
    <View style={styles.container}>
      <FlatList
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
      />
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
