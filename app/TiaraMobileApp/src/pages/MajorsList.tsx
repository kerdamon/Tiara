import { IMajor } from '@common/interfaces/IMajor';
import { API_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CardItem from '../components/CardItemHorizontal';
import FilterComponent from '../components/FilterComponent'; // Import FilterComponent
import FilterSearch from '../components/FilterSearch';
import { Colors } from '../styles/styles';

const MajorsList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['major', 'sdf'],
    queryFn: () => axios.get<IMajor[]>(`${API_URL}/major`),
  });
  const [filteredData, setFilteredData] = useState(data);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilters = (filters: any) => {
    const filtered = data?.data.filter((item) => {
      const universityMatch = !filters.university.length || filters.university.includes(item.university);
      const cityMatch = !filters.city.length || filters.city.includes(item.voivodeship);
      const moneyMatch = item.employmentSalary>= filters.moneyValue[0] && item.employmentSalary <= filters.moneyValue[1];
      const rankingMatch = item.rank >= filters.rankPerspective[0] && item.rank <= filters.rankPerspective[1];
      
      return universityMatch && cityMatch  && moneyMatch && rankingMatch;
    });

    // setFilteredData(filtered);
    setShowFilter(false); // Ukryj komponent filtra po zatwierdzeniu
  };
  console.log(showFilter)


  const renderItem = ({ item }: any) => (
    <CardItem
      title={item.name}
      university={item.university}
      location={item.location}
      duration={item.semesters}
      ranking={item.rank}
      mode={item.studyForm}
      price={item.employmentSalary}
      imageUri={item.imageUrl}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FilterSearch hide={setShowFilter} />
        <View style={styles.horizontalLine} />
      </View>

      {/* Wyświetl filtr, jeśli showFilter jest true */}
      {showFilter ? (
        <FilterComponent onApplyFilter={applyFilters} />
      ) : (
        <FlatList
          data={filteredData?.data} // Użyj przefiltrowanych danych
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    overflow: 'hidden',
  },
  listContainer: {
    paddingBottom: 16,
    top: -30,
  },
  horizontalLine: {
    borderBottomColor: '#A4846D',
    borderBottomWidth: 1,
    marginVertical: 8,
    width: '120%',
    alignSelf: 'center',
  },
  searchContainer: {
    paddingTop: 36,
  },
});

export default MajorsList;
