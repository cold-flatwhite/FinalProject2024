import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { mapsApiKey } from "@env"; // Import Google Maps API key from environment variables

const LocationManager = ({ location: propLocation }) => {
  const [location, setLocation] = useState(null); // State to store the location
  const route = useRoute(); // Get the current route to access passed parameters

  // Update location state based on prop or route parameters
  useEffect(() => {
    if (propLocation) {
      setLocation(propLocation); // Use location passed as a prop
    } else if (route.params) {
      setLocation(route.params.location); // Use location passed via route parameters
    }
  }, [propLocation, route.params]);

  return (
    <View style={styles.container}>
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }} // Display static map image based on the location
          style={styles.mapImage}
        />
      )}
    </View>
  );
};

// Styles for the container and map image
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
