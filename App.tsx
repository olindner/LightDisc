import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const HARDCODEDStartLat = 39.92207;
  const HARDCODEDStartLong = -105.11797;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentPos = await Location.getCurrentPositionAsync({});
      
      // FOR TESTING:
      currentPos.coords.latitude = HARDCODEDStartLat;
      currentPos.coords.longitude = HARDCODEDStartLong;
      //

      setLocation(currentPos.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style ={styles.text}>Lat: {location?.latitude}, long: {location?.longitude}, Error: {errorMsg}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Me"
            description="You Are Here"
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
    height: '90%',
  },
  text: {
    flex: 1,
    paddingTop: 50,
    textAlign: 'right',
  },
});
