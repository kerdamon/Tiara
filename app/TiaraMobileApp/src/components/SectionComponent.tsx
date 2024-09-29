import { IMajor } from '@common/interfaces/IMajor';
import { AxiosResponse } from 'axios';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Paddings } from '../styles/styles';
import CardItem from './CardItem';

interface SectionListProps {
  title: string;
  data?: IMajor[];
  isLoading: boolean;
}

const SectionList: React.FC<SectionListProps> = ({
  title,
  data,
  isLoading,
}) => {
  console.debug(`DATA LENGTH: ${data?.length}`);

  const renderItem = (item: IMajor) => (
    <CardItem
      title={item.name}
      university={item.university}
      location={item.voivodeship}
      price={item.employmentSalary}
      imageUri={item.imageUrl}
    />
  );
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => renderItem(item)}
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
