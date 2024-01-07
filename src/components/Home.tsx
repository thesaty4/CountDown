import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {icons} from '../assets/icons/all-icons';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../constant/routing.const';
import {images} from '../assets/images/all-images';

const Home: React.FC = () => {
  const navigator = useNavigation();

  return (
    <ImageBackground source={images.bg2} style={homeStyles.backgroundImage}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent />
      <View style={homeStyles.container}>
        <View>
          <View>
            <Text
              style={[
                homeStyles.headerText,
                {
                  fontSize: 50,
                },
              ]}>
              Ticker<Text style={{color: 'orange'}}>Box</Text>
            </Text>
            <Text style={homeStyles.headerText}>TRACK YOUR TIME</Text>
          </View>
        </View>
        <TouchableOpacity
          style={homeStyles.button}
          onPress={() => {
            navigator.navigate(routes.clock.route);
          }}>
          <Image style={homeStyles.img} source={icons.clock}></Image>
          <Text style={homeStyles.text}>Clock</Text>
          <Image style={homeStyles.img} source={icons.clock}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={homeStyles.button}
          onPress={() => {
            navigator.navigate(routes.timer.route);
          }}>
          <Image style={homeStyles.img} source={icons.timer}></Image>
          <Text style={homeStyles.text}>Timer</Text>
          <Image style={homeStyles.img} source={icons.timer}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={homeStyles.button}
          onPress={() => {
            navigator.navigate(routes.countDown.route);
          }}>
          <Image style={homeStyles.img} source={icons.countDown}></Image>
          <Text style={homeStyles.text}>Count Down</Text>
          <Image style={homeStyles.img} source={icons.countDown}></Image>
        </TouchableOpacity>
        <Text
          style={[{color: 'white', letterSpacing: 1}, commonStyles.textShadow]}>
          Time never will back !
        </Text>
        <View style={{position: 'absolute', bottom: 10}}>
          <Text
            style={[
              {
                color: 'white',
                letterSpacing: 1,
                fontSize: 10,
                textAlign: 'center',
              },
              commonStyles.textShadow,
            ]}>
            &#169; 2024 by codecom, version 1.0.0
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export const homeStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 255, 0.5)', // Add background color with opacity
    padding: 20,
    gap: 30,
  },
  button: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 50,
    elevation: 10,
  },
  img: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    // marginRight: 50,
    flex: 1, // Take remaining space
  },
});

export const commonStyles = StyleSheet.create({
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 5,
  },
});

export default Home;
