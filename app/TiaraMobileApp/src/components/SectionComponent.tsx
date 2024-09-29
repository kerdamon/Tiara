import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import CardItem from './CardItem';
import { Paddings, Colors, Layout } from '../styles/styles';

interface SectionListProps {
  title: string;
  data: any[];
}

const SectionList: React.FC<SectionListProps> = ({ title, data }) => {
  const renderItem = ({ item }: any) => (
    <CardItem
      title={item.title}
      university={item.university}
      location={item.location}
      price={item.price}
      image={item.image}
    />
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        style={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#581313',
    paddingHorizontal: Paddings.horizontal,
    marginTop: 12,
  },
  carousel: {
    marginTop: Paddings.medium,
  },
});

export default SectionList;
