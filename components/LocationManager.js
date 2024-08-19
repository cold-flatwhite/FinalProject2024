import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../styles"; 
import { mapsApiKey } from "@env";

// LocationManager component for displaying a map image of a given location
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

export default LocationManager;
