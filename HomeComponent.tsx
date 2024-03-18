// React Imports
import React, {useState } from 'react';
import { Button, View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Project Imports
import { setDummyData } from './Utilities';
import { StackParamList } from './types';
import styles from './styles';

type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

const HomeComponent : React.FC<HomeProps> = (props) => {

  useState(() => {
    setDummyData()
    .catch((error) => console.log(`error HomeComponent!!!\n ${error}`))
    .finally(() => {});
  });

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