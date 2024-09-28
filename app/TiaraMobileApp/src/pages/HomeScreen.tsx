import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Welcome in our app!</Text>
          <Text>Hello. Hello.</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('Details')}>Explore More</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
