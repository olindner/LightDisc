// Expo Imports
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';

// React Imports
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView, { Marker } from 'react-native-maps';

// Project Imports
import Coordinates from './Map.json';
import { StackParamList } from './types';

type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

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

function ScoreComponent() {
  return (
    <View style={styles.home}>
      <Text>Score!</Text>
    </View>
  );
}

function MapComponent() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentPos = await Location.getCurrentPositionAsync({});
      
      // FOR TESTING:
      currentPos.coords.latitude = Coordinates.MapCenter.lat;
      currentPos.coords.longitude = Coordinates.MapCenter.long;
      //

      setLocation(currentPos.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style ={styles.errorText}>Error: {errorMsg}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: Coordinates.Coor1.lat,
              longitude: Coordinates.Coor1.long,
            }}
            title="Coord1"
            description="1"
          />
        </MapView>
      )}
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
  },
  errorText: 
  {
    flex: 1,
    textAlign: 'left',
  },
  home: 
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: 
  {
    width: '100%',
    height: '95%',
  }
});
