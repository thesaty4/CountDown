import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {homeStyles} from './Home';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../constant/routing.const';
import {icons} from '../assets/icons/all-icons';

interface ClockProps {
  is24HourFormat: boolean; // true for 24-hour format, false for AM/PM format
}

const Clock = () => {
  const is24HourFormat = false;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullView, setFullView] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [direction, setDirection] = useState<number>(0);
  const navigator = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = is24HourFormat
      ? {hour: '2-digit', minute: '2-digit', second: '2-digit'}
      : {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true};

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <View style={[styles.container]}>
      <StatusBar
        hidden={isFullView}
        backgroundColor="rgba(0, 0, 0, 0)"
        translucent
      />
      <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
      {buttonStatus && (
        <View style={[{gap: 20}, styles.mainAction]}>
          <TouchableOpacity
            style={[
              homeStyles.button,
              styles.actionWrapper,
              {backgroundColor: 'skyblue'},
            ]}
            onPress={() => {
              setFullView(!isFullView);
            }}>
            <Image source={icons.expand} style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={[homeStyles.button, styles.actionWrapper]}
            onPress={() => {
              setDirection((direction + 1) % 4);
            }}>
            <Image source={icons.rotate} style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              homeStyles.button,
              styles.actionWrapper,
              {backgroundColor: 'skyblue'},
            ]}
            onPress={() => {
              navigator.navigate(routes.home.route);
            }}>
            <Image source={icons.home} style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 20,
  },
  mainAction: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 50,
    gap: 60,
    padding: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  actionWrapper: {
    width: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 10,
  },
  actionText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Clock;
