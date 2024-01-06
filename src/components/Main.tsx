import React from 'react';
import {View, StyleSheet} from 'react-native';
import CountdownTimer from './CountdownTimer';

const Main: React.FC = () => {
  return (
    <View style={styles.container}>
      <CountdownTimer initialSeconds={300} />{' '}
      {/* Set the initialSeconds as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
