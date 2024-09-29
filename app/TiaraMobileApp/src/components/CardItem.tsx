import {
  useFonts,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
} from '@expo-google-fonts/work-sans';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Paddings } from '../styles/styles';

interface CardItemProps {
  title: string;
  university: string;
  location: string;
  price: number;
  imageUri: string;
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  university,
  location,
  price,
  imageUri,
}) => {
  const [fontsLoaded] = useFonts({
    WorkSans_500Medium,
    WorkSans_600SemiBold,
  });

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(12, 0, 0, 0.8)',
            'rgba(57, 2, 2, 0.8)',
          ]}
          style={styles.gradientOverlay}
        />
        <View style={styles.textOverlay}>
          <Text style={[styles.title, { fontFamily: 'WorkSans_600SemiBold' }]}>{title}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <MaterialIcons
            name="school"
            size={12}
            color={Colors.cardText}
            style={styles.icon}
          />
          <Text
            style={[styles.university, { fontFamily: 'WorkSans_500Medium' }]}
          >
            {university}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons
            name="place"
            size={12}
            color={Colors.cardText}
            style={styles.icon}
          />
          <Text style={[styles.location, { fontFamily: 'WorkSans_500Medium' }]}>
            {location}
          </Text>
        </View>
        <View style={styles.infoItemPrice}>
          <MaterialIcons
            name="attach-money"
            size={10}
            color={Colors.cardText}
            style={styles.iconPrice}
          />
          <Text style={[styles.price, { fontFamily: 'WorkSans_500Medium' }]}>
            {price} zł
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 144,
    backgroundColor: Colors.cardBackground,
    marginRight: Paddings.medium,
    // marginHorizontal: Paddings.small,
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: Paddings.medium,
    height: 144,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 76,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 16,
    color: Colors.cardText,
    marginTop: 0,
    textAlign: 'center',
    overflow: 'scroll',
  },
  textOverlay: {
    position: 'absolute',
    bottom: -16,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  info: {
    paddingHorizontal: Paddings.small,
    paddingTop: 4,
  },
  university: {
    color: Colors.cardText,
    fontSize: 10,
    lineHeight: 16,
  },
  location: {
    color: Colors.cardText,
    fontSize: 10,
    lineHeight: 16,
  },
  price: {
    color: Colors.cardText,
    fontSize: 10,
    lineHeight: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItemPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 4,
    backgroundColor: '#7C5047',
    borderRadius: 16,
    padding: 6,
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    marginRight: 5,
  },
  iconPrice: {
    marginRight: 2,
  },
});

export default CardItem;
