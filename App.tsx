import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Import the Location module

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 39.9208636,
        longitude: -105.1162414,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      }}  
      >
        <Marker
          coordinate={{
            latitude: 39.9208636,
            longitude: -105.1162414,
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
