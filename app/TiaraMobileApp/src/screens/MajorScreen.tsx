import { Major } from '@common/interfaces/Major';
import { API_URL } from '@env';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Text, View } from 'react-native';

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
      <FontAwesomeIcon icon={faHouse} />
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
