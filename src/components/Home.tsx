import React from 'react';
import {View, StyleSheet} from 'react-native';
import CountdownTimer from './CountdownTimer';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <CountdownTimer initialSeconds={40000} />
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

export default Home;
