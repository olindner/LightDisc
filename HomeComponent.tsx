// React Imports
import React from 'react';
import { Button, View } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";

// Project Imports
import { StackParamList } from './types';
import styles from './styles';


type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;
const Stack = createNativeStackNavigator<StackParamList>();

const HomeComponent : React.FC<HomeProps> = (props) => {
  return (
    <View style={styles.home}>
      <Button 
        title='View Score' 
        onPress=
        {
          () => props.navigation.push("Score")
        }
      />
      <Button 
        title='View Map' 
        onPress=
        {
          () => props.navigation.push("Map")
        }
      />
    </View>
  );
};

export default HomeComponent;