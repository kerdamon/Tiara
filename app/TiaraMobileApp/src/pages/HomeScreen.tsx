import { IMajor } from '@common/interfaces/IMajor';
import { API_URL } from '@env';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBox from '../components/SearchBox';
import SectionList from '../components/SectionComponent'; // Import nowego komponentu

const HomeScreen = () => {
  const { data, isPending } = useQuery({
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

  if (!isPending) {
    return (
      <ScreenWrapper title="Cześć!">
        <SearchBox />
        <SectionList
          title="Ostatnio przeglądane"
          data={data}
          isLoading={false}
        />
        <SectionList title="Wybrane dla Ciebie" data={data} isLoading={false} />
        <SectionList title="W Twojej okolicy" data={data} isLoading={false} />
      </ScreenWrapper>
    );
  }
};

export default HomeScreen;
