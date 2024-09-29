import { faHouseChimney, faTableList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import SCREEN_NAMES from './src/constants/ScreenNames';
import HomeScreen from './src/pages/HomeScreen';
import MajorsList from './src/pages/MajorsList';


const Stack = createStackNavigator();
const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const WHITE = '#FFFFFF';
const PRIMARY = '#ECE4D7';
const SECONDARY = '#510302';

export default function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              tabBarStyle: { backgroundColor: '#510302' },
              tabBarActiveTintColor: WHITE,
              tabBarInactiveTintColor: WHITE,
            }}
          >
            <Tab.Screen
              name="TabHome"
              component={HomeTab}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={[styles.iconContainer, focused && styles.activeIcon]}
                  >
                    <FontAwesomeIcon
                      icon={faTableList}
                      color={focused ? SECONDARY : PRIMARY}
                    />
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="TabCatalogue"
              component={CatalogueTab}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={[styles.iconContainer, focused && styles.activeIcon]}
                  >
                    <FontAwesomeIcon
                      icon={faHouseChimney}
                      color={focused ? SECONDARY : PRIMARY}
                    />
                  </View>
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

function HomeTab() {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.HOME}>
      <Stack.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function CatalogueTab() {
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.CATALOGUE}>
      <Stack.Screen name={SCREEN_NAMES.CATALOGUE} component={MajorsList} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: PRIMARY, // Change this color to whatever you like
  },
});
