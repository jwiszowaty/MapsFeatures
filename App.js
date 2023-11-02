import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Geojson} from "react-native-maps"
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import Manchester from './assets/geojson.json'
export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi</Text>
      <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
        )}
        <Geojson
          geojson={Manchester}
          strokeColor="green"
          fillColor="rgba(255,255,0,0.2)"
          strokeWidth={1}
          onPress={() => {
            
          }}
         />
        </MapView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%'
  },
  map: {
    width: "100%",
    height:'100%'
  }
})
