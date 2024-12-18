import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';

export default function HomePage({ navigation }) {
  const { xp } = useSelector((state) => state);
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);


  const spawnHeads = [
    { id: 1, lat: 47.406611, lon: 9.744500 },
    { id: 2, lat: 47.407641, lon: 9.744500 },
  ];

  useEffect(() => {
    (async () => {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature.'
        );
        setHasLocationPermission(false);
        return;
      }
      setHasLocationPermission(true);

      // Get user location
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01, // Adjust zoom level
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
        region={location}>
        {spawnHeads.map((head) => (
          <Marker
            key={head.id}
            coordinate={{ latitude: head.lat, longitude: head.lon }}
            onPress={() => navigation.navigate('CameraPage', { id: head.id })}
          />
        ))}
      </MapView>
      <View style={{ position: 'absolute', top: 40, left: 20 }}>
        <Text>XP: {xp}/10</Text>
      </View>
    </View>
  );
}
