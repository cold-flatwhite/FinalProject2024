import { StyleSheet, Text, View, Button } from "react-native";
import Reac, { useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const Map = ({ navigation }) => {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  async function verifyPermission() {
    if (response.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give permission to use location service");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button title="find my location" onPress={locateUserHandler}></Button>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
      <Button
        title="Confirm selected Location"
        onPress={() => {
          navigation.navigate("Profile", { location });
        }}
        disabled={!location}
      />
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
