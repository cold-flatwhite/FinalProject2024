import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const PressableButton = ({ children, pressedFunction, componentStyle }) => {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => [
        styles.defaultStyle,
        componentStyle,
        pressed && styles.pressableStyle,
      ]}
    >
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableButton;

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 5,
    backgroundColor: "#0a9396",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  pressableStyle: {
    backgroundColor: "#005f73",
    transform: [{ scale: 0.95 }],
  },
});
