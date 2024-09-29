import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBox from '../components/SearchBox';

const CatalogueScreen = () => {
  return (
    <ScreenWrapper title="Catalogue">
      <SearchBox />
      <Text>Brzydkie slowo chuj</Text>
    </ScreenWrapper>
  );
};

export default CatalogueScreen;
