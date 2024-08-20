import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Array of images and corresponding text for the slides
const images = [
  {
    id: '1',
    source: require('../assets/opening1.jpg'),
    text: 'Find your nearest dog walker',
  },
  {
    id: '2',
    source: require('../assets/opening2.jpg'),
    text: 'Get a reliable cat care provider',
  },
  {
    id: '3',
    source: require('../assets/opening3.jpg'),
    text: 'Take your pet for a grooming',
  },
];

const { width } = Dimensions.get('window'); // Get screen width

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index
  const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position

  // Handle the end of scrolling to update the current index
  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  // Render each slide with image and text
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.source} style={styles.image} resizeMode="contain" />
      <Animated.Text style={styles.text}>{item.text}</Animated.Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images} // Data source for the FlatList
        renderItem={renderItem} // Function to render each item
        horizontal // Horizontal scroll direction
        pagingEnabled // Snap to each slide
        showsHorizontalScrollIndicator={false} // Hide scroll indicator
        onMomentumScrollEnd={handleScrollEnd} // Update current index on scroll end
        keyExtractor={(item) => item.id} // Unique key for each slide
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // Animate based on scroll position
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#d3d3d3', '#696969', '#d3d3d3'], // Animate dot color based on scroll position
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dot, { backgroundColor: dotColor }]} />;
        })}
      </View>
      {currentIndex === images.length - 1 && ( // Show button on the last slide
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Signup')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
  },
  image: {
    width: '80%',
    height: '60%',
  },
  text: {
    fontSize: 18,
    color: '#45afbf',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#d3d3d3',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4169E1',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
