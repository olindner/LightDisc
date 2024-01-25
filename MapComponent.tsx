// Expo Imports
import { LocationObjectCoords } from 'expo-location';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// React Imports
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Project Imports
import Coordinates from './Map.json';
import GPSCoordinates from './MapData.json';
import styles from './styles';

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
            {GPSCoordinates && GPSCoordinates.Points.map(marker => (
                <Marker
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
                    key={marker.id}
                    title={marker.title}
                >
                    <Ionicons name="golf" size={24} color="red" />
                </Marker>
            ))}
          </MapView>
        )}
      </View>
    );
  }

  export default MapComponent;