import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../styles/styles';

const SearchBox = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#999" />
      <TextInput
        style={styles.input}
        placeholder="Opisz wymarzony kierunek..."
        placeholderTextColor="#A4846D"
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
    width: 358, // Fixed width
    height: 40, // Fixed height
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
});

export default SearchBox;
