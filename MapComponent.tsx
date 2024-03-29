// Expo Imports
import { LocationObjectCoords } from 'expo-location';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// React Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Project Imports
import GPSCoordinates from './MapData.json';
import styles from './styles';
import { retrieveCurrentScoresheet, setRecentCourseIdAsync } from './Utilities';

interface IconProps {
  isFirst: boolean;
}

function Icon({ isFirst }: IconProps) {
  if (isFirst) {
    return <Ionicons name="caret-forward-circle" size={24} color="green" />;
  }
  return <Ionicons name="golf" size={24} color="red" />;
}

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
  // Todo: create method to calculate this center instead of hardcoding
  currentPos.coords.latitude = GPSCoordinates.MapCenter.lat;
  currentPos.coords.longitude = GPSCoordinates.MapCenter.long;
  //

  setLocation(currentPos.coords);
}

function MapComponent() {
    const [location, setLocation] = useState<LocationObjectCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [recentCourseId, setRecentCourseId] = useState<string>("test");
    const [currentHole, setCurrentHole] = useState<number>(0);
    const [currentStrokes, setCurrentStrokes] = useState<number>(0);
    const [currentScoresheet, setCurrentScoresheet] = useState<Array<number>>([]);
    let totalHoles = GPSCoordinates.Points.length;
  
    // First render
    useState(() => {
      (async () => {
        await getLocationPermissionsAsync(setErrorMsg)
        .then(() => setLocationAsync(setLocation))
        .then(() => setRecentCourseIdAsync(setRecentCourseId))
        .then(async() => {
          var ss = await retrieveCurrentScoresheet() as Array<number>;
          if (ss == null) {
            ss = Array(totalHoles).fill(0);
          }
          setCurrentScoresheet(ss);
        });
      })();
    });

    const incrementStrokes = () => {
      const newStrokes = currentStrokes + 1;
      setCurrentStrokes(newStrokes);
    }

    const selectHole = async (id:number) => {
      setCurrentHole(id);

      // Default should still be 0
      let strokes = await retrieveCurrentScoresheet(id) as number;

      setCurrentStrokes(strokes);
    }

    const saveScoresheet = async () => {
      try {
        let ss = await retrieveCurrentScoresheet() as Array<number>;

        if (ss == null) {
          throw new Error("currentScoresheet is null!");
        }

        ss[currentHole] = currentStrokes;

        AsyncStorage.setItem("currentScoresheet", JSON.stringify(ss));
        
      } catch (error) {
        console.log(`Error when saving Stroke Scoresheet: ${error}`);
      }
    }
  
    return (
      <View style={styles.container}>
        <Text style ={styles.errorText}>rci: {recentCourseId}, hole: {currentHole}, strokes: {currentStrokes}</Text>
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
            <View style={{flexDirection:'row'}}>
              <Pressable style={styles.mapButtonAdd} onPress={incrementStrokes}>
                <Text style={styles.mapButtonText}>AddStroke</Text>
              </Pressable>
              <Pressable style={styles.mapButtonSave} onPress={saveScoresheet}>
                <Text style={styles.mapButtonText}>Save</Text>
              </Pressable>
            </View>
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
      </View>
    );
  }

  export default MapComponent;