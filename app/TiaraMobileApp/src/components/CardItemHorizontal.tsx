import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
} from '@expo-google-fonts/work-sans';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../styles/styles';

interface CardItemProps {
  title: string;
  university: string;
  location: string;
  duration: string;
  ranking: string;
  mode: string;
  price: string;
  imageUri: string;
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  university,
  location,
  duration,
  ranking,
  mode,
  price,
  imageUri,
}) => {
  const [fontsLoaded] = useFonts({
    WorkSans_500Medium,
    WorkSans_600SemiBold,
  });

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.textOverlay}>
        <Text
          style={[
            styles.title,
            styles.subBg,
            { fontFamily: 'WorkSans_600SemiBold' },
          ]}
        >
          {title}
        </Text>
        <View style={styles.containerHor}>
          <View style={styles.subBg}>
            <View style={styles.containerLoc}>
              <MaterialIcons
                name="school"
                size={12}
                color={Colors.cardBackground}
                style={styles.icon}
              />
              <Text style={styles.textSubTitle}>{university}</Text>
            </View>
          </View>

          <View style={styles.subBg}>
            <MaterialIcons
              name="place"
              size={12}
              color={Colors.cardBackground}
              style={styles.icon}
            />
            <Text style={styles.textSubTitle}>{location}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={[styles.infoItem]}>
            <MaterialIcons name="work" size={12} color={Colors.background} />
            <Text style={styles.lastText}>{duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="emoji-events"
              size={12}
              color={Colors.background}
            />
            <Text style={styles.lastText}>{ranking}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="schedule"
              size={12}
              color={Colors.background}
            />
            <Text style={styles.lastText}>{mode}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons
              name="attach-money"
              size={12}
              color={Colors.background}
            />
            <Text style={styles.lastText}>{price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 358,
    height: 80,
    borderRadius: 12,
    borderColor: '#A4846d',
    borderWidth: 1,
    top: 50,
    marginBottom: 16,
  },
  containerHor: {
    marginTop: 4,
    flexDirection: 'row',
    marginBottom: 4,
  },
  containerLoc: {
    flexDirection: 'row',
    left: -2,
  },
  textSubTitle: {
    fontFamily: 'WorkSans_500Medium',
    fontSize: 12,
    color: Colors.cardBackground,
    marginLeft: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: Colors.cardBackground,
    marginTop: 0,
    textAlign: 'center',
    overflow: 'scroll',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginRight: 4,
    padding: 1,
    paddingLeft: 4,
    paddingRight: 2,
  },
  subBg: {
    backgroundColor: 'rgba(236, 228, 215, 0.6)',
    borderRadius: 4,
    flexDirection: 'row',
    marginLeft: 5,
    paddingRight: 4,
    marginTop: 4,
    top: -4,
  },
  icon: {
    marginRight: 1,
    marginTop: 1.4,
  },
  lastText: {
    color: Colors.background,
    fontFamily: 'WorkSans_500Medium',
    fontSize: 11,
    marginRight: 4,
  },
});

export default CardItem;
