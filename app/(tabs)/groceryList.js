import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

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
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && (
          <IconSymbol
            name="checkmark"
            size={12}
            color="#FFFFFF"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        {/* <IconSymbol
          size={310}
          color="rgba(128, 128, 128, 0.15)"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        /> */}
        <ThemedText style={styles.headerTitle} type="title">
          Grocery List
        </ThemedText>
      </ThemedView>
      <FlatList
        data={sortedIngredients}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ThemedView style={styles.ingredientContainer}>
            <CustomCheckBox
              checked={checkedItems[item.id] || false}
              onPress={() => handleCheck(item.id)}
            />
            <ThemedText 
              style={[
                styles.ingredientText,
                checkedItems[item.id] && styles.checkedText
              ]}
            >
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
    opacity: 0.7,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ingredientText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#3498DB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
});