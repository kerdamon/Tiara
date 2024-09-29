import { IMajor } from '@common/interfaces/IMajor';
import { API_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBox from '../components/SearchBox';
import SectionList from '../components/SectionComponent';
import { ActivityIndicator, View, Text } from 'react-native';

const HomeScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['major', 'sdf'],
    queryFn: () =>
      axios
        .post<IMajor[]>(`${API_URL}/major`, {
          prompt: 'dupa',
        })
        .then((res) => {
          console.log('got data from backend');
          return res.data;
        }),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load data. Please try again.</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper title="Cześć!">
      <SearchBox />
      <SectionList title="Ostatnio przeglądane" data={data} isLoading={isLoading} />
      <SectionList title="Wybrane dla Ciebie" data={data} isLoading={isLoading} />
      <SectionList title="W Twojej okolicy" data={data} isLoading={isLoading} />
    </ScreenWrapper>
  );
};

export default HomeScreen;
