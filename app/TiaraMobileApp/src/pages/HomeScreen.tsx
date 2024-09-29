import { IMajor } from '@common/interfaces/IMajor';
import { API_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBox from '../components/SearchBox';
import SectionList from '../components/SectionComponent'; // Import nowego komponentu

const data = [
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    price: 7600,
    image: require('../../assets/IconD.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    price: 7600,
    image: require('../../assets/IconD.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    price: 7600,
    image: require('../../assets/IconD.png'),
  },
  {
    title: 'Informatyka',
    university: 'Politechnika Śląska',
    location: 'Gliwice',
    price: 7600,
    image: require('../../assets/IconD.png'),
  },
];

const HomeScreen = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['major', 'sdf'],
    queryFn: () =>
      axios.post<IMajor[]>(`${API_URL}/major`, {
        prompt: 'dupa',
      }),
  });

  return (
    <ScreenWrapper title="Cześć!">
      <SearchBox />
      <SectionList
        title="Ostatnio przeglądane"
        data={data}
        isLoading={isFetching}
      />
      <SectionList
        title="Wybrane dla Ciebie"
        data={data}
        isLoading={isFetching}
      />
      <SectionList
        title="W Twojej okolicy"
        data={data}
        isLoading={isFetching}
      />
    </ScreenWrapper>
  );
};

export default HomeScreen;
