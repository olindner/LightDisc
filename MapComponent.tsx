// Expo Imports
import { LocationObjectCoords } from 'expo-location';
import * as Location from 'expo-location';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// React Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import MapView, { Marker } from 'react-native-maps';

// Project Imports
import GPSCoordinates from './MapData.json';
import styles from './styles';
import { computeDistance, retrieveCurrentScoresheet, setRecentCourseIdAsync } from './Utilities';

interface IconProps {
  isFirst: boolean;
}

function Icon({ isFirst }: IconProps) {
  if (isFirst) {
    return <Ionicons name="caret-forward-circle" size={24} color="green" />;
  }
  return <Ionicons name="golf" size={24} color="red" />;
}

const getLocationPermissionsAsync = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
}

const setLocationAsync = async (setLocation:React.Dispatch<React.SetStateAction<LocationObjectCoords | null>>) => {
  let currentPos = await Location.getCurrentPositionAsync();
  let isEmulator = await DeviceInfo.isEmulator();

  if (isEmulator) {
    currentPos.coords.latitude = GPSCoordinates.MapCenter.lat;
    currentPos.coords.longitude = GPSCoordinates.MapCenter.long;
  }
  
  setLocation(currentPos.coords);
  return currentPos.coords;
}

function MapComponent() {
    const [location, setLocation] = useState<LocationObjectCoords | null>(null);
    const [distanceToHole, setDistanceToHole] = useState<string>("0.00");
    const [recentCourseId, setRecentCourseId] = useState<string>("test");
    const [currentHole, setCurrentHole] = useState<number>(0);
    const [currentStrokes, setCurrentStrokes] = useState<number>(0);
    const [currentScoresheet, setCurrentScoresheet] = useState<Array<number>>([]);
    let totalHoles = GPSCoordinates.Points.length;
  
    // First render
    useState(() => {
      try {
        (async () => {
          await getLocationPermissionsAsync()
          .then(() => setLocationAsync(setLocation))
          .then(() => setRecentCourseIdAsync(setRecentCourseId))
          .then(async() => {
            var ss = await retrieveCurrentScoresheet() as Array<number>;

            if (ss.length == 0) {
              ss = Array(totalHoles).fill(0);
              AsyncStorage.setItem("currentScoresheet", JSON.stringify(ss));
            }

            setCurrentScoresheet(ss);
          });
        })();
      } 
      catch (error) {
        console.log(`Error in useState: ${error}`);
      }
    });

    useEffect(() => {
      try {
        (async () => {
          setLocationAsync(setLocation)
          .then((coords) => {
              let distance = computeDistance(coords.latitude, coords.longitude, GPSCoordinates.Points[currentHole].latitude, GPSCoordinates.Points[currentHole].longitude);
              setDistanceToHole(distance);
          });
        })();
      } 
      catch (error) {
        console.log(`Error in useEffect: ${error}`);
      }
    }); // Could make it only update when "currentHole" changes

    const incrementStrokes = () => {
      try {
        let newStrokes = currentStrokes + 1;
        setCurrentStrokes(newStrokes);

        currentScoresheet[currentHole] = newStrokes;
        AsyncStorage.setItem("currentScoresheet", JSON.stringify(currentScoresheet));
      }
      catch (error) {
        console.log(`Error when incrementing strokes and saving Stroke Scoresheet: ${error}`);
      }
    }

    const selectHole = (id:number) => {
      setCurrentHole(id);

      let strokes = currentScoresheet[id];
      setCurrentStrokes(strokes);
    }

    const resetHole = () => {
      setCurrentStrokes(0);
      currentScoresheet[currentHole] = 0;
      AsyncStorage.setItem("currentScoresheet", JSON.stringify(currentScoresheet));
    }

    return (
      <View>
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
                    onPress={() => selectHole(marker.id)}
                    title={marker.title}
                >
                  <Icon isFirst={marker.id == 0}/>
                </Marker>
            ))}
          </MapView>
        )}
        <View>
          <Text style={styles.mapDistanceText}>Distance to hole: {distanceToHole}</Text>
        </View>
        <View style={styles.mapButtonTopContainer}>
          <Pressable style={styles.mapButtonThrow} onPress={incrementStrokes}>
            <Text style={styles.mapButtonText}>Throw</Text>
          </Pressable>
          <Pressable style={styles.mapButtonCurrent} disabled={true}>
            <FontAwesome5 style={{marginRight:10}} name="compact-disc" size={24} color="black" />
            <Text style={styles.mapButtonText}>{currentStrokes}</Text>
          </Pressable>
          <Ionicons name="refresh-circle" size={20} color="peru" onPress={resetHole}/>
        </View>
      </View>
    );
  }

  export default MapComponent;