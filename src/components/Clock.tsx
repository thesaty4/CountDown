import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ClockProps {
  is24HourFormat: boolean; // true for 24-hour format, false for AM/PM format
}

const Clock: React.FC<ClockProps> = ({is24HourFormat}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(currentTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Clock;
