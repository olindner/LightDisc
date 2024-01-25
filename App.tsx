// React Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Project Imports
import HomeComponent from './HomeComponent';
import MapComponent from "./MapComponent";
import ScoreComponent from './ScoreComponent';
import { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeComponent} />
        <Stack.Screen name='Score' component={ScoreComponent} />
        <Stack.Screen name='Map' component={MapComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}