import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {routes} from '../constant/routing.const';
import {icons} from '../assets/icons/all-icons';
import {useNavigation} from '@react-navigation/native';
import ActionButtons, {ActionItems} from '../shared/ActionButtons';
import IncreaseDecreaseInput from '../shared/IncreaseDecreaseInput';
import {audios} from '../assets/audio/all-audios';

const buttons: ActionItems[] = [
  {
    id: 1,
    icon: icons.expand,
  },
  {
    id: 2,
    icon: icons.time,
  },
  {
    id: 3,
    icon: icons.home,
    redirectTo: routes.home.route,
  },
  {
    id: 3,
    icon: icons.nightMode,
  },
  {
    id: 4,
    icon: icons.clock,
    redirectTo: routes.clock.route,
  },
];
var Sound = require('react-native-sound');

const Timer: React.FC<{isCountDown?: boolean}> = ({isCountDown}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(isCountDown ? 59 : 0);
  const [isFullView, setFullView] = useState(false);
  const [isClock, setClock] = useState(true);
  const [myActions, setActions] = useState(buttons);
  const [isRunning, setIsRunning] = useState(false);
  let intervalId: NodeJS.Timeout | null = null;
  const sound = new Sound(
    audios.notification,
    Sound.MAIN_BUNDLE,
    (error: any) => {
      if (error) {
        console.error('Error loading sound', error);
      }
    },
  );

  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedSeconds(prevSeconds => {
          const currentSeconds = prevSeconds + (isCountDown ? -1 : 1);
          if (currentSeconds <= 0) {
            setElapsedSeconds(isCountDown ? 59 : 0);
            setIsRunning(false);
            sound.play();
          }
          return currentSeconds <= 0 ? (isCountDown ? 59 : 0) : currentSeconds;
        });
      }, 1000);
    }

    // Clear the interval when the component is unmounted
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const handleTimer = () => {
    if (isRunning) {
      if (intervalId) {
        clearInterval(intervalId);
      }
    } else {
      setElapsedSeconds(elapsedSeconds);
    }

    setIsRunning(!isRunning);
    setActions(
      myActions.map(item => ({
        ...item,
        icon: item.id == 2 ? (isRunning ? icons.time : icons.stop) : item.icon,
      })),
    );
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const TotalTime = () => {
      return (
        <Text style={styles.timerText}>
          {days ? days.toString().padStart(2, '0') + ':' : ''}
          {hours ? hours.toString().padStart(2, '0') + ':' : ''}
          {minutes.toString().padStart(2, '0') + ':'}
          {remainingSeconds.toString().padStart(2, '0')}
        </Text>
      );
    };

    return (
      <>
        {isClock && (
          <>
            <TouchableOpacity
              onPress={() =>
                !isRunning && setElapsedSeconds(isCountDown ? 59 : 0)
              }>
              <Image source={icons.alarmClock} width={500} height={500} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 20,
              }}>
              {[days, hours, minutes, remainingSeconds].every(
                item => item == 0,
              ) ? (
                "Let's Start"
              ) : isRunning ? (
                'Running...'
              ) : (
                <Text style={{color: 'red'}}>Paused</Text>
              )}
            </Text>
          </>
        )}
        <TouchableOpacity
          onPress={() => {
            setFullView(!isFullView);
          }}>
          <TotalTime />
        </TouchableOpacity>
        {isClock && !isRunning && isCountDown && (
          <View style={{marginTop: 20}}>
            <IncreaseDecreaseInput
              initialSecond={elapsedSeconds}
              onChange={second => {
                setElapsedSeconds(second);
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={isFullView}
        backgroundColor="rgba(0, 0, 0, 0)"
        translucent
      />
      {formatTime(elapsedSeconds)}
      {!isFullView && (
        <ActionButtons
          items={myActions}
          onClick={item => {
            switch (item.id) {
              case 1:
                setFullView(!isFullView);
                break;
              case 2:
                handleTimer();
                break;
              case 3:
                setClock(!isClock);
                break;
            }
          }}
        />
      )}
    </View>
  );
};

export default Timer;

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
  toggleImg: {
    height: 30,
    width: 30,
  },
});
