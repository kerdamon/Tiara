import { API_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Text, View } from 'react-native';
import { Major } from '../../interfaces/Major';

const MajorScreen = () => {
  const { data } = useQuery({
    queryKey: ['major', 'sdf'],
    queryFn: () =>
      axios.post<Major[]>(`${API_URL}/major`, {
        prompt: 'dupa',
      }),
  });

  return (
    <View>
      <Text>Major:</Text>
      <Text>{data?.data[0].city}</Text>
      <Text>{data?.data[0].faculty}</Text>
      <Text>{data?.data[0].jobSearchTime}</Text>
      <Text>{data?.data[0].numberOfGraduates}</Text>
      <Text>{data?.data[0].rank}</Text>
      <Text>{data?.data[0].unemploymentPercent}</Text>
      <Text>{data?.data[0].university}</Text>
    </View>
  );
};

export default MajorScreen;
