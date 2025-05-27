import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchText, onSearchTextChange, onFilterPress }) => {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome name="search" size={20} color="#E13E79" />
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar"
        placeholderTextColor="#E13E79"
        value={searchText}
        onChangeText={onSearchTextChange}
      />
      <TouchableOpacity onPress={onFilterPress}>
        <Ionicons name="options-outline" size={20} color="#E13E79" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: '#E13E79',
  },
})