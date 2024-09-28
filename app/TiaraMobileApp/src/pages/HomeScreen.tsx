import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
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
  return (
    <ScreenWrapper title="Cześć!">
      <SectionList title="Ostatnio przeglądane" data={data} />
      <SectionList title="Wybrane dla Ciebie" data={data} />
      <SectionList title="W Twojej okolicy" data={data} />
    </ScreenWrapper>
  );
};

export default HomeScreen;
