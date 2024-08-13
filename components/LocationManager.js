import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { mapsApiKey } from "@env";

const LocationManager = ({ location: propLocation }) => {
  const [location, setLocation] = useState(null);
  const route = useRoute();

  useEffect(() => {
    if (propLocation) {
      setLocation(propLocation);
    } else if (route.params) {
      setLocation(route.params.location);
    }
  }, [propLocation, route.params]);

  return (
    <View style={styles.container}>
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
          style={styles.mapImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E6F0FA",
  },
  mapImage: {
    width: 350,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default LocationManager;
