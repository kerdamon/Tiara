import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Colors, Paddings } from '../styles/styles';
import { CormorantGaramond_700Bold, useFonts } from '@expo-google-fonts/cormorant-garamond';
import * as SplashScreen from 'expo-splash-screen';

interface ScreenWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ title, children }) => {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Ukrywa splash screen po załadowaniu czcionek
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Dopóki czcionki nie zostaną załadowane, nie renderuj niczego
  }

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../../assets/bgP.png')}
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>{title}</Text>
      </ImageBackground>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerImage: {
    width: '100%',
    height: 170,
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 45,
  },
  headerText: {
    fontSize: 80,
    fontWeight: '700',
    color: Colors.background,
    lineHeight: 80,
    position: 'absolute',
    top: 40,
    left: 24,
    fontFamily: 'CormorantGaramond_700Bold',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: Paddings.horizontal,
    paddingTop: Paddings.medium,
  },
});

export default ScreenWrapper;
