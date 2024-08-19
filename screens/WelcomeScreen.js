import React, { useState, useRef } from "react";
import { View, Text, Image, FlatList, Dimensions, Animated, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles"; 

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

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.source} style={styles.image} resizeMode="contain" />
      <Text style={styles.welcomeText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.welcomeContainer}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#d3d3d3', '#696969', '#d3d3d3'],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dot, { backgroundColor: dotColor }]} />;
        })}
      </View>
      {currentIndex === images.length - 1 && (
        <TouchableOpacity style={styles.welcomeButton} onPress={() => navigation.replace('Signup')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WelcomeScreen;
