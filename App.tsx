import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Import the Location module

const App = () => {
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    const updateUserLocation = (location: any) => {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    const watchUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        updateUserLocation(location);

        const locationSubscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 5000 },
          (newLocation) => {
            updateUserLocation(newLocation);
          }
        );

        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      }
    };

    watchUserLocation();

    return () => {
      // Cleanup (if needed) when component unmounts
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello Expo6!</Text>
      {/* {typeof document !== 'undefined' && (
       <MapView
       style={{ flex: 1, width: '100%' }}
       initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
     >
       <Marker
         coordinate={{
           latitude: 37.78825,
           longitude: -122.4324,
         }}
         title="Marker Title"
         description="Marker Description"
       />
     </MapView>     
      )} */}
    </View>
  );
};

export default App;
