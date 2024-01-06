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
          <Text style={{fontSize: 20, color: 'white', fontWeight: '900'}}>
            TRACK YOUR TIME
          </Text>
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
        <Text style={{color: 'white', letterSpacing: 1}}>
          Time never will back !
        </Text>
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

export default Home;
