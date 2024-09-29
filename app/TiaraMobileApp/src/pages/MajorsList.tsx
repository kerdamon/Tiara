import { IMajor } from '@common/interfaces/IMajor';
import { API_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CardItem from '../components/CardItemHorizontal';
import SearchBox from '../components/SearchBox';
import { Colors } from '../styles/styles';

const dataasdf = [
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    duration: '6 mies',
    ranking: '23 w Techniczne',
    mode: 'Dzienne',
    price: '7600 zł',
    image: require('../../assets/newCard.png'),
  },
];

const MajorsList = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['major', 'sdf'],
    queryFn: () => axios.get<IMajor[]>(`${API_URL}/major`),
  });

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

  const [filteredData, setFilteredData] = useState(data);

  // const applyFilters = (filters: any) => {
  //   const filtered = data.filter((item) => {
  //     const universityMatch =
  //       !filters.university.length ||
  //       filters.university.includes(item.university);
  //     const cityMatch =
  //       !filters.city.length || filters.city.includes(item.location);
  //     const studyFormMatch =
  //       !filters.studyForm.length || filters.studyForm.includes(item.mode);
  //     const moneyMatch =
  //       item.price.replace(' zł', '') >= filters.moneyValue[0] &&
  //       item.price.replace(' zł', '') <= filters.moneyValue[1];
  //     const rankingMatch =
  //       item.ranking >= filters.rankPerspective[0] &&
  //       item.ranking <= filters.rankPerspective[1];

  //     return (
  //       universityMatch &&
  //       cityMatch &&
  //       studyFormMatch &&
  //       moneyMatch &&
  //       rankingMatch
  //     );
  //   });

  //   setFilteredData(filtered);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBox />
        {/* <FilterComponent onApplyFilter={applyFilters} /> */}
        <View style={styles.horizontalLine} />
      </View>

      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    overflow: 'hidden',
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
