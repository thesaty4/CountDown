import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CountdownTimerProps {
  initialSeconds: number;
}

const CountdownTimer = () => {
  const initialSeconds = 200;
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once (on mount)

  // Format seconds into different formats based on the duration
  const formatTime = (totalSeconds: number) => {
    if (totalSeconds >= 3600) {
      // Display as 1D:HH:MM:SS if more than or equal to 1 hour
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const remainingSeconds = totalSeconds % 60;

      const formattedDays = days > 0 ? `${days}D:` : '';
      const formattedHours =
        hours > 0 ? `${String(hours).padStart(2, '0')}:` : '';
      const formattedMinutes =
        minutes > 0 ? `${String(minutes).padStart(2, '0')}:` : '';
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`;
    } else if (totalSeconds >= 60) {
      // Display as MM:SS if more than or equal to 1 minute
      const minutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;

      const formattedMinutes =
        minutes > 0 ? `${String(minutes).padStart(2, '0')}:` : '';
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${formattedMinutes}${formattedSeconds}`;
    } else {
      // Display as SS for less than 1 minute
      return `${String(totalSeconds).padStart(2, '0')}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CountdownTimer;
