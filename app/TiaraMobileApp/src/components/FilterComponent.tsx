import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import Slider from '@react-native-community/slider';
import { Colors } from '../styles/styles';

interface FilterComponentProps {
  onApplyFilter: (filters: {
    university: string[];
    city: string[];
    studyForm: string[];
    moneyValue: number;
    rankPerspective: number;
  }) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onApplyFilter }) => {
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(
    [],
  );
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedStudyForms, setSelectedStudyForms] = useState<string[]>([]);
  const [moneyValue, setMoneyValue] = useState(5000);
  const [rankPerspective, setRankPerspective] = useState(50);

  const universities = ['Politechnika Śląska', 'Uniwersytet Warszawski', 'AGH'];
  const cities = ['Gliwice', 'Warszawa', 'Kraków'];
  const studyForms = ['Stacjonarne', 'Zaoczne'];

  const applyFilters = () => {
    const filters = {
      university: selectedUniversities,
      city: selectedCities,
      studyForm: selectedStudyForms,
      moneyValue,
      rankPerspective,
    };
    onApplyFilter(filters);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wybierz uniwersytet</Text>
      <MultiSelect
        items={universities.map((item) => ({ id: item, name: item }))}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedUniversities}
        selectedItems={selectedUniversities}
        selectText="Wybierz uniwersytet"
        textColor={Colors.background} // Harmonized text color
        searchInputPlaceholderText="Szukaj..."
        searchInputStyle={styles.searchX}
        styleDropdownMenuSubsection={styles.multiSelectDropdown}
        styleTextDropdown={styles.dropdownText}
        styleTextDropdownSelected={styles.selectedText}
        tagRemoveIconColor={Colors.secondaryBackground} // Updated colors for consistency
        tagBorderColor={Colors.secondaryBackground}
        tagTextColor={Colors.secondaryBackground}
        selectedItemTextColor={Colors.cardBackground}
        selectedItemIconColor={Colors.cardBackground}
        itemTextColor={Colors.cardBackground}
        submitButtonColor={Colors.cardBackground}
        submitButtonText="Zatwierdź"
      />

      <Text style={styles.label}>Wybierz miasto</Text>
      <MultiSelect
        items={cities.map((item) => ({ id: item, name: item }))}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedCities}
        selectedItems={selectedCities}
        selectText="Wybierz miasto"
        textColor={Colors.background} // Harmonized text color
        searchInputPlaceholderText="Szukaj..."
        searchInputStyle={styles.searchX}
        styleDropdownMenuSubsection={styles.multiSelectDropdown}
        styleTextDropdown={styles.dropdownText}
        styleTextDropdownSelected={styles.selectedText}
        tagRemoveIconColor={Colors.secondaryBackground} // Updated colors for consistency
        tagBorderColor={Colors.secondaryBackground}
        tagTextColor={Colors.secondaryBackground}
        selectedItemTextColor={Colors.cardBackground}
        selectedItemIconColor={Colors.cardBackground}
        itemTextColor={Colors.cardBackground}
        submitButtonColor={Colors.cardBackground}
        submitButtonText="Zatwierdź"
      />

      <Text style={styles.label}>Forma studiów</Text>
      <MultiSelect
        items={studyForms.map((item) => ({ id: item, name: item }))}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedStudyForms}
        selectedItems={selectedStudyForms}
        selectText="Wybierz formę studiów"
        textColor={Colors.background} // Harmonized text color
        searchInputPlaceholderText="Szukaj..."
        searchInputStyle={styles.searchX}
        styleDropdownMenuSubsection={styles.multiSelectDropdown}
        styleTextDropdown={styles.dropdownText}
        styleTextDropdownSelected={styles.selectedText}
        tagRemoveIconColor={Colors.secondaryBackground} // Updated colors for consistency
        tagBorderColor={Colors.secondaryBackground}
        tagTextColor={Colors.secondaryBackground}
        selectedItemTextColor={Colors.cardBackground}
        selectedItemIconColor={Colors.cardBackground}
        itemTextColor={Colors.cardBackground}
        submitButtonColor={Colors.cardBackground}
        submitButtonText="Zatwierdź"
      />

      <Text style={styles.label}>Cena studiów (min/max)</Text>
      <Slider
        value={moneyValue}
        onValueChange={setMoneyValue}
        minimumValue={0}
        maximumValue={10000}
        step={500}
        style={styles.slider}
        minimumTrackTintColor={Colors.cardBackground} // Updated colors for slider
        maximumTrackTintColor={Colors.cardBackground}
        thumbTintColor={Colors.secondaryBackground} // Thumb color for slider
      />
      <Text style={styles.valueText}>Min: {moneyValue} PLN</Text>

      <Text style={styles.label}>Ranking (min/max)</Text>
      <Slider
        value={rankPerspective}
        onValueChange={setRankPerspective}
        minimumValue={0}
        maximumValue={100}
        step={1}
        style={styles.slider}
        minimumTrackTintColor={Colors.cardBackground}
        maximumTrackTintColor={Colors.cardBackground}
        thumbTintColor={Colors.secondaryBackground}
      />
      <Text style={styles.valueText}>Ranking: {rankPerspective}</Text>

      <Button
        mode="contained"
        onPress={applyFilters}
        buttonColor={Colors.cardBackground}
        style={{ marginTop: 14 }}
      >
        Zastosuj filtry
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#A4846D', // Base background color
    borderWidth: 2,
    borderRadius: 16,
    borderColor: Colors.secondaryBackground,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: Colors.background, // Unified label text color
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 8,
  },
  multiSelectDropdown: {
    backgroundColor: Colors.background, // Updated to maintain consistent UI
    borderRadius: 12,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  dropdownText: {
    color: Colors.cardBackground, // Text color for dropdowns
  },
  selectedText: {
    color: Colors.cardBackground, // Selected text color consistency
  },
  valueText: {
    marginVertical: 4,
    color: Colors.background, // Slider value text color
  },
  searchX: {
    fontSize: 16,
    padding: 8,
  },
});

export default FilterComponent;
