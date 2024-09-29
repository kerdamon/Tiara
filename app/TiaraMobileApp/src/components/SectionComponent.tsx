import { IMajor } from '@common/interfaces/IMajor';
import { AxiosResponse } from 'axios';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Paddings } from '../styles/styles';
import CardItem from './CardItem';

interface SectionListProps {
  title: string;
  data?: AxiosResponse<IMajor[]>;
  isLoading: boolean;
}

const SectionList: React.FC<SectionListProps> = ({
  title,
  data,
  isLoading,
}) => {
  const renderItem = ({ item }: { item: IMajor }) => (
    <CardItem
      title={item.name}
      university={item.university}
      location={item.voivodeship}
      price={item.employmentSalary}
      image={item.imageUrl}
    />
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data?.data}
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
