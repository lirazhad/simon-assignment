import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoreScreen from '../screens/ScoreScreen';

export enum ScreensNames {
  Home = 'Home',
  Game = 'Game',
  Score = 'Score',
}

export type RootStackParamList = {
  Home: undefined;
  Game: {userName?: string};
  Score: {userName?: string; score?: number};
};

export const RootNavigator = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ScreensNames.Home}>
        <RootStack.Screen name={ScreensNames.Home} component={HomeScreen} />
        <RootStack.Screen name={ScreensNames.Game} component={GameScreen} />
        <RootStack.Screen name={ScreensNames.Score} component={ScoreScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
