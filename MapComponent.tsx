// Expo Imports
import { LocationObjectCoords } from 'expo-location';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// React Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Project Imports
import Coordinates from './Map.json';
import GPSCoordinates from './MapData.json';
import styles from './styles';
import { setDummyData, setRecentCourseIdAsync } from './Utilities';

const getLocationPermissionsAsync = async ( setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
}

const setLocationAsync = async (setLocation:React.Dispatch<React.SetStateAction<LocationObjectCoords | null>>) => {
  let currentPos = await Location.getCurrentPositionAsync({});
        
  // FOR TESTING:
  currentPos.coords.latitude = Coordinates.MapCenter.lat;
  currentPos.coords.longitude = Coordinates.MapCenter.long;
  //

  setLocation(currentPos.coords);
}

function MapComponent() {
    const [location, setLocation] = useState<LocationObjectCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [recentCourseId, setRecentCourseId] = useState<string>("");
  
    // First render
    useState(() => {
      console.log("useState Map Component");
      (async () => {
        await getLocationPermissionsAsync(setErrorMsg);
        await setLocationAsync(setLocation);


        if (!recentCourseId || recentCourseId == '') {
          console.log("Prob not");
          await setRecentCourseIdAsync(setRecentCourseId);
        }
        else {
          console.log("recentCourseId already set!");
        }
      })();
    });
  
    return (
      <View style={styles.container}>
        <Text style ={styles.errorText}>recentCourseId: {recentCourseId}</Text>
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