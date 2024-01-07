import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {routes} from '../constant/routing.const';
import {icons} from '../assets/icons/all-icons';
import ActionButtons, {ActionItems} from '../shared/ActionButtons';

interface ClockProps {
  is24HourFormat: boolean; // true for 24-hour format, false for AM/PM format
}

const buttons: ActionItems[] = [
  {
    id: 1,
    icon: icons.expand,
  },
  {
    id: 3,
    icon: icons.home,
    redirectTo: routes.home.route,
  },
  {
    id: 2,
    icon: icons.time,
    redirectTo: routes.timer.route,
  },
];

const Clock = () => {
  const is24HourFormat = false;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullView, setFullView] = useState(false);

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
    <View style={[clockStyles.container]}>
      <StatusBar
        hidden={isFullView}
        backgroundColor="rgba(0, 0, 0, 0)"
        translucent
      />
      <TouchableOpacity onPress={() => setFullView(!isFullView)}>
        <Text style={clockStyles.timerText}>{formatTime(currentTime)}</Text>
      </TouchableOpacity>
      {!isFullView && (
        <ActionButtons
          items={buttons}
          onClick={item => {
            switch (item.id) {
              case 1:
                setFullView(!isFullView);
                break;
            }
          }}
        />
      )}
    </View>
  );
};

export const clockStyles = StyleSheet.create({
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
    position: 'absolute',
    bottom: 0,
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
