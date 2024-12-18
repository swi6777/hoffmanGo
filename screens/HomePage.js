import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

export default function HomePage({ navigation }) {
  const { xp } = useSelector((state) => state);

  const spawnHeads = [
    { id: 1, lat: 47.406611, lon: 9.744500 },
    { id: 2, lat: 47.407641, lon: 9.744500 },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 47.406611,
          longitude: 9.744500,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
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
