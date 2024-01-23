import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import Coordinates from './Map.json';

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '95%',
  },
  errorText: {
    flex: 1,
    paddingTop: 20,
    textAlign: 'left',
  },
});
