/*
  Copyright (c) [2024] [Satya Narayan Mishra]
  All rights reserved.

  This source code is licensed under the [License Type] license found in the
  LICENSE file in the root directory of this source tree.
   
  You may not use, modify, or distribute this file without permission.
*/
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/components/Home';
import {routes} from './src/constant/routing.const';
import Clock from './src/components/Clock';
import CountdownTimer from './src/components/CountdownTimer';
import Timer from './src/components/Timer';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.home.route}>
        <Stack.Screen
          name={routes.home.route}
          component={Home}
          options={{title: routes.home.label, headerShown: false}}
        />
        <Stack.Screen
          name={routes.clock.route}
          component={Clock}
          options={{title: routes.clock.label, headerShown: false}}
        />
        <Stack.Screen
          name={routes.timer.route}
          component={Timer}
          options={{title: routes.timer.label, headerShown: false}}
        />
        <Stack.Screen
          name={routes.countDown.route}
          component={CountdownTimer}
          options={{title: routes.countDown.label, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
