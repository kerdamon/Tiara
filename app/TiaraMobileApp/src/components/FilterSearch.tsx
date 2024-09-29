import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../styles/styles';

interface FilterSearchProps {
  hide: (value: boolean) => void; // Funkcja ukrywająca komponent filtra
}
const FilterSearch: React.FC<FilterSearchProps> = ({ hide }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#999" />
      <TextInput
        style={styles.input}
        placeholder="Opisz wymarzony kierunek..."
        placeholderTextColor="#A4846D"
      />
      <MaterialIcons
        name="filter-list"
        size={24}
        style={styles.filter}
        color={Colors.cardBackground}
        onPress={() => hide(true)} // Wywołanie funkcji ukrycia
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3DACD',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#9E9087',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 290,
    height: 40,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.cardBackground,
  },
  filter: {
    marginLeft: 8,
  },
});

export default FilterSearch;
