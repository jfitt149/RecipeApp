import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function GroceryListScreen() {
  const route = useRoute();
  const { recipes } = route.params;

  const ingredients = recipes.flatMap(recipe => recipe.extendedIngredients);
  const uniqueIngredients = Array.from(new Map(ingredients.map(item => [item.id, item])).values());
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = (id) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const sortedIngredients = uniqueIngredients.sort((a, b) => {
    if (checkedItems[a.id] && !checkedItems[b.id]) return 1;
    if (!checkedItems[a.id] && checkedItems[b.id]) return -1;
    return 0;
  });

  const CustomCheckBox = ({ checked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
        <ThemedText type="title">Grocery List</ThemedText>
      </ThemedView>
      <FlatList
        data={sortedIngredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.ingredientContainer}>
            <CustomCheckBox
              checked={checkedItems[item.id] || false}
              onPress={() => handleCheck(item.id)}
            />
            <ThemedText style={checkedItems[item.id] ? styles.checkedText : null}>
              {item.original}
            </ThemedText>
          </ThemedView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
    padding: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
});
