import { StyleSheet, Text, View, Button } from "react-native";
import Reac, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  return (
    <>
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
