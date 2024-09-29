import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useFonts,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
} from '@expo-google-fonts/work-sans';
import { Colors } from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsScreen: React.FC = () => {
  // Dane do ekranu szczegółów
  const title = 'Informatyka';
  const university = 'Politechnika Śląska';
  const location = 'Gliwice';
  const ranking = '3 w Techniczne w Perspektywy 2024';
  const duration =
    '3 MIESIĄCE, KTÓRE ŚREDNIO ZAJMUJE ZNALEZIENIE PRACY PO TYM KIERUNKU';
  const graduates = '200 ABSOLWENTÓW ROCZNIE';
  const salary = '7600 zł ŚREDNIE ZAROBKI BRUTTO ROK PO STUDIACH';
  const image = require('../../assets/LLL.png'); // Upewnij się, że ścieżka do obrazu jest poprawna

  const [fontsLoaded] = useFonts({
    WorkSans_500Medium,
    WorkSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.cardBackground} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0 )',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.8)',
          ]}
          style={styles.gradientOverlay}
        />
        <View style={styles.textOverlay}>
          <View style={styles.firstly}>
            <MaterialIcons
              name="emoji-events"
              size={16}
              color={Colors.cardBackground}
              style={styles.icon}
            />
            <Text style={styles.ranking}>{ranking}</Text>
          </View>
          <Text style={[styles.title, { fontFamily: 'WorkSans_600SemiBold' }]}>
            {title}
          </Text>
          <Text style={styles.university}>
            <MaterialIcons
              name="school"
              size={14}
              color={Colors.secondaryBackground}
            />{' '}
            {university}
          </Text>
          <Text style={styles.location}>
            <MaterialIcons
              name="place"
              size={14}
              color={Colors.secondaryBackground}
            />{' '}
            {location}
          </Text>
        </View>
        <View style={styles.container3}>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{graduates}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{salary}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  firstly: {
    backgroundColor: 'rgba(236, 228, 215, 0.6)',
    borderRadius: 16,
    marginLeft: 1,
    paddingRight: 4,
    marginTop: 4,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBackground,
    overflow: 'hidden',
    height: 420,
    marginTop: 40,
    backgroundColor: Colors.secondaryBackground
  },
  image: {
    width: 370,
    height: 166,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 145,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 16,
  },
  ranking: {
    fontSize: 14,
    color: Colors.cardBackground,
    marginBottom: 4,
    backgroundColor: '',
    fontFamily: 'WorkSans_500Medium',
  },
  title: {
    fontSize: 22, // Slightly larger font size for better balance
    color: Colors.secondaryBackground,
    marginBottom: 8,
  },
  containerLoc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  university: {
    fontSize: 16,
    color: Colors.secondaryBackground,
    marginLeft: 4,
    marginRight: 8,
  },
  location: {
    fontSize: 16,
    color: Colors.secondaryBackground,
    marginLeft: 4,
    fontFamily: 'WorkSans_500Medium',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderColor: Colors.cardBackground,
    fontFamily: 'WorkSans_500Medium',
  },
  detailItem: {
    paddingVertical: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  detailText: {
    fontSize: 14, // Reduced font size to fit more content
    color: Colors.secondaryBackground,
    fontFamily: 'WorkSans_500Medium',
    textAlign: 'center', // Centered text for a cleaner look
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 250,
  },
  icon: {
    marginTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
  },
  container3: {
    top: 10,
    backgroundColor: Colors.secondaryBackground
  }
});

export default DetailsScreen;
