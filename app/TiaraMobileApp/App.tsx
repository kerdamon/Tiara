import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import SCREEN_NAMES from './src/constants/ScreenNames';
import HomeScreen from './src/pages/HomeScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={SCREEN_NAMES.HOME}>
            <Stack.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>

    </PaperProvider>
  );
}
