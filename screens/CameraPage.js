import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [cameraRef, setCameraRef] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);
      Alert.alert(
        "QR Code Scanned",
        `Bar code with type ${type} and data ${data} has been scanned!`,
        [
          {
            text: "OK",
            onPress: () => {
              setScanned(false);
              navigation.navigate("HomePage", { scannedData: data }); 
              setAlertVisible(false);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        style={styles.camera}
        ref={(ref) => setCameraRef(ref)}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
